/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyC4vdPQiA3Qsx46NrMC305k5euMQBolZxY"
  },
  typescript: {
    // !! WARN !! => Fixing typing erros to remove it while in production
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig