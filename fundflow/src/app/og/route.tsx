import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") ?? "FundFlow"
    const description = searchParams.get("description") ?? "Modern Personal Finance Management"

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
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                opacity: 0.8,
                maxWidth: "600px",
              }}
            >
              {description}
            </p>
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