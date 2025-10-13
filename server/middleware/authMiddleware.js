import jwt from "jsonwebtoken"

export function verifySupabaseJWT(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_TOKEN)
    req.user = { id: decoded.sub };  
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
