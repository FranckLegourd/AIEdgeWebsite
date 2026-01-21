# DNS Configuration for Google Workspace & Hostinger

This document contains the consolidated DNS records required to optimize email delivery, security, and branding for a domain using **Google Workspace** for email and **Hostinger** for web hosting.

## 1. MX Records (Mail Routing)
These records direct your incoming email to Google's servers.
*Note: Delete any existing MX records (like GoDaddy's default) before adding these.*

| Type | Name | Priority | Value / Destination |
| :--- | :--- | :--- | :--- |
| MX | @ | 1 | `smtp.google.com` |

---

## 2. SPF Record (Email Authorization)
This record authorizes both Google and Hostinger to send emails on behalf of your domain.

| Type | Name | Value |
| :--- | :--- | :--- |
| TXT | @ | `v=spf1 include:_spf.google.com include:_spf.mail.hostinger.com ~all` |

---

## 3. DKIM Record (Email Signing)
This record prevents spoofing by adding a digital signature to outgoing mail.
*Generate the specific value in your Google Admin Console (Apps > Google Workspace > Gmail > Authenticate email).*

| Type | Name | Value |
| :--- | :--- | :--- |
| TXT | google._domainkey | [PASTE YOUR GENERATED GOOGLE KEY HERE] |

---

## 4. DMARC Record (Security Policy)
This record tells servers what to do if SPF or DKIM fails. We recommend starting with a "None" (Monitoring) policy.

| Type | Name | Value |
| :--- | :--- | :--- |
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:admin@yourdomain.com` |

---

## 5. MTA-STS & TLS Reporting (Encryption)
These records force encrypted connections and provide reports on connection health.

### DNS Records (GoDaddy)
| Type | Name | Value |
| :--- | :--- | :--- |
| TXT | _mta-sts | `v=STSv1; id=202401201800;` |
| TXT | _smtp._tls | `v=TLSRPTv1; rua=mailto:admin@yourdomain.com` |

### Policy File (Hostinger)
Create a file at `https://mta-sts.yourdomain.com/.well-known/mta-sts.txt` with this content:
```text
version: STSv1
mode: testing
mx: smtp.google.com
max_age: 604800

To implement MTA-STS for Google Workspace, you need to perform a two-step process: hosting a small policy file on your website (at Hostinger) and adding a companion DNS record at GoDaddy.1. Create the MTA-STS Policy FileOpen a plain text editor (like Notepad or TextEdit) and paste the following content. This specifically authorizes Google's mail servers:Plaintextversion: STSv1
mode: testing
mx: smtp.google.com
max_age: 604800
Save the file as: mta-sts.txtMode: Leave this as testing for now. After a few weeks of successful reports, you can change it to enforce.2. Host the File at HostingerFor the protocol to work, this file must be accessible at a very specific URL: https://mta-sts.yourdomain.com/.well-known/mta-sts.txtCreate a Subdomain: In your Hostinger Panel, create a subdomain named mta-sts (so the full address is mta-sts.yourdomain.com).Upload the File: Use the Hostinger File Manager to go to the root folder of that new subdomain.Create the Folder: Create a folder named .well-known (include the dot).Upload: Place your mta-sts.txt file inside that .well-known folder.Enable SSL: Ensure your SSL certificate is active for this subdomain; the file must be served over https.3. Add the DNS Records at GoDaddyNow, you need to tell the world where to find that policy. Add these two TXT records:TypeName / HostValue / TextTXT_mta-stsv=STSv1; id=202401201800;TXT_smtp._tlsv=TLSRPTv1; rua=mailto:admin@yourdomain.comThe ID tag: Use a unique string (like the current date/time). Whenever you update your policy file in the future, you must change this ID at GoDaddy so servers know to download the new version.The RUA tag: This is the TLS-RPT record. It directs other servers to send you reports about any encryption issues they face when emailing you.Final VerificationAfter setting this up, you can check your work by going to the Google Admin Console > Apps > Google Workspace > Gmail > Compliance and selecting Validate your MTA-STS configuration.

3. TLS-RPT (TLS Reporting)
This works alongside MTA-STS. It asks other mail servers to send you a daily report if they had any trouble establishing a secure connection to your domain.

The Record: | Type | Name | Value | | :--- | :--- | :--- | | TXT | _smtp._tls | v=TLSRPTv1; rua=mailto:tls-reports@yourdomain.com |


1. BIMI (Brand Indicators for Message Identification)
BIMI allows your company logo to appear next to your emails in the recipient's inbox. This is a massive boost for brand recognition and trust.   

Requirements: You must have an "enforced" DMARC policy (p=quarantine or p=reject) and a logo in a specific SVG format.

The Record: | Type | Name | Value | | :--- | :--- | :--- | | TXT | default._bimi | v=BIMI1; l=https://yourdomain.com/logo.svg; a=; |

https://support.google.com/a/answer/10911321?hl=en

Implementing BIMI (Brand Indicators for Message Identification) is the final step in making your brand's logo appear in recipients' inboxes. Because you are using Google Workspace, this process has a few strict requirements that go beyond just adding a DNS record.1. The Prerequisites (Must be done first)Before Google will display your logo, your domain must meet these security standards:DMARC Enforcement: Your DMARC policy must be set to p=quarantine or p=reject. The p=none (monitoring) policy we set up earlier will not work for BIMI.Strong Authentication: Both SPF and DKIM must be active and passing for at least 48 hours.2. Prepare Your Logo (SVG Tiny PS)Google requires your logo to be in a very specific format called SVG Tiny Portable/Secure (SVG Tiny PS). Standard SVGs from Canva or basic exports will often fail.Design: Use a square aspect ratio (1:1). Center your logo so it doesn't get cut off by circular or rounded inbox frames.Solid Background: Avoid transparent backgrounds, as they can display inconsistently in dark mode or different email clients.Format: Export as SVG Tiny 1.2 from Adobe Illustrator or a similar tool.Manual Clean-up: Open the SVG file in a text editor (like Notepad) and ensure:The baseProfile attribute is set to "tiny-ps".The version attribute is "1.2".There are no external links, scripts, or animations.There is a <title> tag with your company name inside the <svg> tag.3. The "Blue Checkmark" Requirement (VMC)To see your logo in Gmail (including Google Workspace), Google generally requires a Verified Mark Certificate (VMC).Trademark Required: You must have a legally registered trademark for your logo to get a VMC.Cost: VMCs are issued by Certificate Authorities (like DigiCert or Entrust) and typically cost around $1,300–$1,500 per year.Without a VMC: Your logo might show up in other apps (like Apple Mail), but it usually will not show up in Gmail or display the blue "verified" checkmark.4. Add the BIMI Record at GoDaddyOnce your logo is hosted on a secure https:// URL (and you have your VMC .pem file, if applicable), add this TXT record to your GoDaddy DNS:TypeHost / NameValue / TextTXTdefault._bimiv=BIMI1; l=https://yourdomain.com/logo.svg; a=https://yourdomain.com/vmc.pem;l=: The full HTTPS URL to your SVG logo.a=: The full HTTPS URL to your VMC certificate. If you do not have a VMC, leave this as a=;.5. Verify Your SetupAfter saving at GoDaddy, use the official BIMI Inspector to verify your record. It will tell you if your SVG file meets the technical requirements and if your DMARC policy is strong enough.


To upgrade your DMARC record to p=quarantine at GoDaddy, you will edit the existing _dmarc TXT record you created earlier. This tells receiving servers that if an email fails authentication, it should be sent directly to the recipient's Spam folder rather than being delivered to the Inbox.

Step-by-Step Instructions for GoDaddy
Log in to your GoDaddy Domain Portfolio and select your domain.

Navigate to the DNS Management section.

Locate your existing DMARC record: Look for the TXT record with the name _dmarc.

Edit the record: Click the Edit (pencil) icon next to that record.

Update the Value: Change the p=none part of the text to p=quarantine.

New Value: v=DMARC1; p=quarantine; pct=100; rua=mailto:admin@yourdomain.com

Save your changes.

Important Considerations for the Upgrade
Gradual Rollout (Optional): If you are nervous about legitimate emails being sent to spam, you can use the pct (percentage) tag to apply the policy to only a portion of your mail first.

Example (10% enforcement): v=DMARC1; p=quarantine; pct=10; rua=mailto:admin@yourdomain.com

You can then increase this to 25, 50, and finally 100 over several weeks as you monitor your DMARC reports.

The 48-Hour Rule: Google strongly recommends that you have your SPF and DKIM records active for at least 48 hours before moving to p=quarantine. This ensures that your own legitimate mail doesn't accidentally get quarantined during the transition.

Monitor your "RUA" Reports: Keep checking the reports sent to your rua email address. If you see legitimate emails from your Hostinger website or other tools failing, you may need to adjust your SPF record before staying at 100% quarantine.