import jwt from "jsonwebtoken"

export function verifySupabaseJWT(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    // Verify using the secret from Supabase settings (Project Settings → API)
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_TOKEN)
    req.user = decoded  // decoded contains sub (user id), role, exp, etc.
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
