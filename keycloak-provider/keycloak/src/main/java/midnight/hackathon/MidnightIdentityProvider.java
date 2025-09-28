package main.java.midnight.hackathon;

import org.keycloak.broker.provider.AbstractIdentityProvider;
import org.keycloak.broker.provider.AuthenticationRequest;
import org.keycloak.broker.provider.BrokeredIdentityContext;
import org.keycloak.models.FederatedIdentityModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;

import jakarta.ws.rs.core.Response;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URI;

public class MidnightIdentityProvider extends AbstractIdentityProvider<MidnightIdentityProviderConfig> {

    public MidnightIdentityProvider(KeycloakSession session, MidnightIdentityProviderConfig config) {
        super(session, config);
    }

    @Override
    public Response performLogin(AuthenticationRequest request) {
        try {
            URL url = new URL("http://host.docker.internal:3001/generate-and-verify-proof");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            conn.connect();

            int responseCode = conn.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BrokeredIdentityContext identity = new BrokeredIdentityContext("user.from.midnight");
                identity.setUsername("midnight_user");
                
                // Fixed: Create URI properly and return Response with redirect
                URI redirectUri = request.getUriInfo().getBaseUriBuilder()
                        .path("realms/" + request.getRealm().getName() + "/broker/" + getConfig().getAlias() + "/endpoint")
                        .queryParam("code", request.getState().getDecodedState())
                        .build();
                
                return Response.seeOther(redirectUri).build();

            } else {
                return Response.serverError().entity("Proof verification failed.").build();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error connecting to proof server.").build();
        }
    }

    @Override
    public BrokeredIdentityContext getFederatedIdentity(String response) {
        BrokeredIdentityContext identity = new BrokeredIdentityContext("user.from.midnight");
        identity.setUsername("midnight_user");
        identity.setIdpConfig(getConfig());
        identity.setIdp(this);
        return identity;
    }

    @Override
    public Response retrieveToken(KeycloakSession session, FederatedIdentityModel identity) {
        return Response.ok(identity.getToken()).build();
    }
}
