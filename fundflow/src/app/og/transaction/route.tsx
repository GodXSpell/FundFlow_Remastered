import { ImageResponse } from "next/og"

export const runtime = "edge"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const amount = searchParams.get("amount") ?? "$0.00"
    const category = searchParams.get("category") ?? "Unknown"

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              padding: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Transaction
            </h1>
            <div
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {amount}
            </div>
            <div
              style={{
                fontSize: "32px",
                opacity: 0.8,
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: "20px",
                opacity: 0.6,
                marginTop: "20px",
              }}
            >
              Transaction ID: {id}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    return new Response("Failed to generate OG image", { status: 500 })
  }
}