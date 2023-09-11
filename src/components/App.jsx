// https://fluentsite.z22.web.core.windows.net/quick-start
import {
    FluentProvider,
    teamsLightTheme,
    teamsDarkTheme,
    teamsHighContrastTheme,
    tokens,
} from "@fluentui/react-components";
import {
    HashRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./config";
import { useEffect } from "react";
// import { ChaosHandlerOptions } from "@microsoft/microsoft-graph-client";
// import { TeamsUserCredential } from "@microsoft/teamsfx";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
    const { loading, theme, themeString, teamsUserCredential } =
        useTeamsUserCredential({
            initiateLoginEndpoint: config.initiateLoginEndpoint,
            clientId: config.clientId,
        });

    // const [aToken, setAToken] = useState("");

    // const something = teamsUserCredential.getToken();
    // console.log("something ->", something);

    // useEffect(() => {
    //   async function GetAccessToken() {
    //     const credential = new TeamsUserCredential();
    //     const scopes = ["https://graph.microsoft.com/User.Read"];
    //     const token = await credential.getToken(scopes);
    //     setAToken(token);
    //     console.log("token -> ");
    //   }
    //   GetAccessToken();
    // }, []);

    // useEffect(() => {
    //   <Navigate
    //     to={`https://login.microsoftonline.com/47165d17-0fdb-4f2a-a567-116783fae3a5/oauth2/v2.0/authorize?
    //   client_id=218ad958-2c4d-41aa-966b-41bef53d0ac4
    //   &response_type=code
    //   &redirect_uri=https://localhost:53000/auth-start.html
    //   &response_mode=query
    //   &scope=https://graph.microsoft.com/user.read`}
    //   />;
    // }, []);
    // console.log("custom console", process.env.AAD_APP_TENANT_ID);
    // console.log(teamsUserCredential);

    // useEffect(() => {
    //   loading &&
    //     app.initialize().then(() => {
    //       // Hide the loading indicator.
    //       app.notifySuccess();
    //     });
    // }, [loading]);
    return (
        <TeamsFxContext.Provider
            value={{ theme, themeString, teamsUserCredential }}
        >
            <FluentProvider
                theme={
                    themeString === "dark"
                        ? teamsDarkTheme
                        : themeString === "contrast"
                        ? teamsHighContrastTheme
                        : {
                              ...teamsLightTheme,
                              colorNeutralBackground3: "#eeeeee",
                          }
                }
                style={{ background: tokens.colorNeutralBackground3 }}
            >
                <Router>
                    {!loading && (
                        <Routes>
                            <Route path="/privacy" element={<Privacy />} />
                            <Route
                                path="/termsofuse"
                                element={<TermsOfUse />}
                            />
                            <Route path="/tab" element={<Tab />} />
                            <Route path="/config" element={<TabConfig />} />
                            <Route
                                path="*"
                                element={<Navigate to={"/tab"} />}
                            ></Route>
                        </Routes>
                    )}
                </Router>
            </FluentProvider>
        </TeamsFxContext.Provider>
    );
}
