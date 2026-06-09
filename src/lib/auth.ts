async authorize(credentials) {
  console.log('LOGIN ATTEMPT', credentials)

  const parsed = loginSchema.safeParse(credentials)

  if (!parsed.success) {
    console.log('VALIDATION FAILED', parsed.error)
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })

  console.log('USER FOUND:', !!user)

  if (!user) return null

  const passwordMatch = await bcrypt.compare(
    parsed.data.password,
    user.hashedPassword
  )

  console.log('PASSWORD MATCH:', passwordMatch)

  if (!passwordMatch) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}