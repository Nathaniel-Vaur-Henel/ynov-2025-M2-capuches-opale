import React from "react";
import { RedocStandalone } from "redoc";

const ApiDocs: React.FC = () => {
    return (
        <RedocStandalone
            specUrl="/swagger-capuches-opale.yml"
            options={{
                theme: {
                    typography: {
                        fontSize: "16px",
                        headings: {
                            fontWeight: "bold",
                        },
                        links: {
                            color: "#4A90E2",
                        },
                    },
                    colors: {
                        primary: {
                            main: "#4A90E2",
                        },
                        text: {
                            primary: "#ffffff",
                            secondary: "#b0b0b0",
                        },
                        responses: {
                            success: { color: "#28a745" },
                            error: { color: "#dc3545" },
                            info: { color: "#17a2b8" },
                            redirect: { color: "#f39c12" },
                        },
                        http: {
                            get: "#61AFFE",
                            post: "#49CC90",
                            put: "#FCA130",
                            delete: "#F93E3E",
                        },
                    },
                    sidebar: {
                        backgroundColor: "#1e1e2f",
                        textColor: "#ffffff",
                        activeTextColor: "#4A90E2",
                    },
                    rightPanel: {
                        backgroundColor: "#1e1e2f",
                        textColor: "#ffffff",
                    },
                },
            }}
        />
    );
};

export default ApiDocs;
