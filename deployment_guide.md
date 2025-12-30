# Deployment Guide: alexpolyakov.me

This guide explains how to configure your GitHub repository and Cloudflare to serve your profile page at `http://alexpolyakov.me/`.

## 1. Project Configuration (Already Applied)
I have added a `CNAME` file to your project's `public` directory containing `alexpolyakov.me`. This tells GitHub Pages that this repository handles that domain.

**Next Steps:**
1.  **Push the CNAME file**: I will handle this in the next step.

## 2. GitHub Pages Configuration
You need to enable GitHub Pages for your repository.

1.  Go to your repository on GitHub: [https://github.com/glip80/glip80](https://github.com/glip80/glip80)
2.  Click on **Settings** > **Pages** (in the sidebar).
3.  Under **Build and deployment**:
    *   **Source**: Choose **GitHub Actions**.
    *   GitHub will detect the workflow file I created (`.github/workflows/deploy.yml`) and automatically use it.

**Workflow File Created:**
I have already created `.github/workflows/deploy.yml` for you. Once you push this change (which I am doing now), GitHub Actions will trigger a build.

## 3. Cloudflare DNS Configuration
You need to point your domain to GitHub's servers.

1.  Log in to **Cloudflare**.
2.  Select your domain `alexpolyakov.me`.
3.  Go to **DNS** > **Records**.
4.  Add/Edit the following records:

| Type | Name | Content | Proxy Status |
| :--- | :--- | :--- | :--- |
| **CNAME** | `@` (root) | `glip80.github.io` | **Proxied** (Orange Cloud) |
| **CNAME** | `www` | `glip80.github.io` | **Proxied** (Orange Cloud) |

*Note: GitHub Pages usually recommends A records for the root domain, but Cloudflare's CNAME Flattening allows you to use a CNAME for the root (`@`). This is often easier.*

If you prefer A records (standard GitHub recommendation):
*   **A** | `@` | `185.199.108.153`
*   **A** | `@` | `185.199.109.153`
*   **A** | `@` | `185.199.110.153`
*   **A** | `@` | `185.199.111.153`

## 4. Verify
1.  Wait a few minutes for DNS propagation.
2.  Visit `http://alexpolyakov.me/`.
3.  GitHub Pages will automatically provision an SSL certificate (HTTPS), so `https://alexpolyakov.me/` will also work.
