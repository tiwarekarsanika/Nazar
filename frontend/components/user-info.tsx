"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/client"
import { LogoutButton } from "./logout-button"

export default function UserInfo() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  if (!user) return null

  return (
    <div className="flex items-center gap-2">
      <LogoutButton />
    </div>
  )
}
