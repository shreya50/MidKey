package midnight.hackathon;

import org.keycloak.models.IdentityProviderModel;

public class MidnightIdentityProviderConfig extends IdentityProviderModel {
    public MidnightIdentityProviderConfig(IdentityProviderModel model) { 
        super(model); 
    }
    
    public MidnightIdentityProviderConfig() {}
}
