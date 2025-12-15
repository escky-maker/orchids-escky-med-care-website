# Custom Domain Setup Guide

## Setting Up a Custom Domain for Escky Med Care

### Option 1: Main Domain (e.g., esckymedcare.com)

1. **Purchase a domain** from a registrar (Namecheap, GoDaddy, Google Domains, etc.)

2. **Configure DNS records** in your domain registrar:
   - Add an **A record** pointing to your hosting IP
   - Or add a **CNAME record** pointing to your Vercel/Netlify deployment URL

3. **Example DNS Configuration:**
   ```
   Type: A
   Name: @
   Value: [Your hosting IP]
   TTL: 3600
   
   Type: CNAME
   Name: www
   Value: esckymedcare.vercel.app
   TTL: 3600
   ```

4. **Add domain to Vercel/Netlify:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `esckymedcare.com`)
   - Follow the verification steps

---

### Option 2: Subdomain for App Downloads (e.g., app.esckymedcare.com)

1. **Add a subdomain CNAME record** in your DNS settings:
   ```
   Type: CNAME
   Name: app
   Value: esckymedcare.vercel.app
   TTL: 3600
   ```

2. **Configure routing in Vercel:**
   - Add `app.esckymedcare.com` as a domain
   - Set it to redirect to `/app` path

3. **Test the setup:**
   - Visit `app.esckymedcare.com`
   - Should load your app download page

---

### Verification Timeline
- DNS changes can take **24-48 hours** to propagate globally
- Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation status

---

### SSL/HTTPS
- Vercel/Netlify automatically provisions **free SSL certificates**
- HTTPS will be enabled within minutes after domain verification

---

### Need Help?
Contact: tendwaescriva4@gmail.com
