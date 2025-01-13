import { NextRequest, NextResponse } from "next/server";

const MOCK_USER = {
  email: "cexi@gmail.com",
  password: "cexi1234",
  token: "secure-token-123",
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("auth_token", MOCK_USER.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (token === MOCK_USER.token) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
