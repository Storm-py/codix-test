import { NextResponse } from 'next/server'
import dbConnect from '@/app/config/dbConnect'
import User from '@/app/models/User'
import bcrypt from 'bcrypt'

export async function POST(request) {
  await dbConnect()
  try {
    const { name, email, password } = await request.json()
    console.log(email,name,password)

    
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, Email, and Password are required' }, { status: 400 })
    }

    
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: 'User created successfully', User: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error creating User:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
