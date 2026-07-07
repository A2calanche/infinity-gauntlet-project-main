import { useEffect } from "react";

export function useGoogleSignInButton(buttonRef, language, onSuccess, onError) {
  useEffect(() => {
    const node = buttonRef.current;
    if (!node) return;

    let active = true;

    const handleResponse = async (response) => {
      if (!response?.credential) {
        onError?.("Google authentication failed");
        return;
      }
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/google`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });
        const data = await res.json();
        if (!res.ok) {
          onError?.(data.message || "Google login failed");
          return;
        }
        onSuccess?.();
      } catch {
        onError?.("Connection error, try again later");
      }
    };

    const renderButton = () => {
      if (!active || !window.google?.accounts?.id) return;
      node.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
        ux_mode: "popup",
      });
      window.google.accounts.id.renderButton(node, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        locale: language,
      });
      
    };

    const existingScript = document.getElementById("google-client-script");
    if (existingScript) existingScript.remove();
  


    const script = document.createElement("script");
    script.src = `https://accounts.google.com/gsi/client?hl=${language}`;
    script.id = "google-client-script";
    script.async = true;
    script.defer = true;
    script.onload = renderButton;
    document.body.appendChild(script);

    return () => {
      active = false;
      node.innerHTML = "";
    };
  }, [language, buttonRef, onSuccess, onError]);
}