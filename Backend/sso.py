
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from datetime import datetime
import random
import zlib
import base64
import urllib.parse

app = FastAPI()

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range", "Accept-Ranges", "Content-Length"],
)

# --- Static Files ---
pdf_folder_path = r"C:\40015\Chat\Backend\New"
app.mount("/pdfs", StaticFiles(directory=pdf_folder_path), name="pdfs")

# --- Example Endpoint ---


@app.post("/query")
def get_pdf_sources():
    base_url = "http://localhost:8000"   # <-- backend host
    return {
        "answer": "Your answer text here...",
        "sources": [{"file": f"{base_url}/pdfs/sample.pdf", "page": 3}],
        "timing": {"embedding_retrieval": 0.12, "llm_response": 1.5, "total": 1.62},
    }


# --- Azure AD Login Redirect ---


@app.get("/ValidateAzureAD")
async def login():
    print("************************* Azure AD Login Triggered *************************")

    tenant_id = "171e44f2-8514-4bcc-b505-9621c9721066"
    number = random.randint(100000, 999999)
    unique_id = f"_{number}"
    issue_instant = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

    sso_login_url = f"https://login.microsoftonline.com/{tenant_id}/saml2"
    # ✅ your callback endpoint
    sso_reply_url = "http://localhost:23107/api/SSOReplyURI"

    # http://incomeanalyzer/api/SSOReplyURI
    # http://localhost:4000/api/SSOReplyURI
    # http://localhost:4000/api/SSOReplyURI

    application_base_url = "IncomeAnalyzer"
    # application_base_url = "IncomeCalculator"

    xml = f"""<samlp:AuthnRequest
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="{unique_id}"
    Version="2.0"
    IssueInstant="{issue_instant}"
    Destination="{sso_login_url}"
    AssertionConsumerServiceURL="{sso_reply_url}"
    ForceAuthn="true">
    <saml:Issuer>{application_base_url}</saml:Issuer>
    <samlp:NameIDPolicy
        Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
        AllowCreate="true"/>
</samlp:AuthnRequest>"""

    def deflate_raw(data: bytes) -> bytes:
        compressor = zlib.compressobj(level=9, wbits=-15)
        compressed = compressor.compress(data)
        compressed += compressor.flush()
        return compressed

    xml_bytes = xml.encode("utf-8")
    deflated = deflate_raw(xml_bytes)
    base64_encoded = base64.b64encode(deflated).decode("utf-8")
    url_encoded = urllib.parse.quote(base64_encoded)

    relay_state = "SAMLRequestFromFastAPI"
    redirect_url = f"{sso_login_url}?SAMLRequest={url_encoded}&RelayState={urllib.parse.quote(relay_state)}"

    print(f"Redirecting to: {redirect_url}")

    return RedirectResponse(url=redirect_url)

# --- SSO Callback Endpoint ---


@app.post("/api/SSOReplyURI")
async def SSOReplyURI(req: Request):
    print("Callback hit:", req.url)
    print('req ================> ', req)
    frontend_url = "http://localhost:5173/chat"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="refresh" content="0; url={frontend_url}">
        <title>Redirecting...</title>
    </head>
    <body>
        <p>Redirecting to chat...</p>
        <script>
            window.location.href = "{frontend_url}";
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)
