function computeControlPoints(K: string | any[]) {
  const p1 = new Array(K.length)
  const p2 = new Array(K.length)
  const n = K.length - 1

  const a = new Array(n)
  const b = new Array(n)
  const c = new Array(n)
  const r = new Array(n)

  // 엔드 포인트 설정
  a[0] = 0
  b[0] = 2
  c[0] = 1
  r[0] = K[0] + 2 * K[1]

  for (let i = 1; i < n; i++) {
    a[i] = 1
    b[i] = 4
    c[i] = 1
    r[i] = 4 * K[i] + 2 * K[i + 1]
  }

  a[n - 1] = 2
  b[n - 1] = 7
  c[n - 1] = 0
  r[n - 1] = 8 * K[n - 1] + K[n]

  // 토마스 알고리즘
  for (let i = 1; i < n; i++) {
    const m = a[i] / b[i - 1]
    b[i] = b[i] - m * c[i - 1]
    r[i] = r[i] - m * r[i - 1]
  }

  p1[n - 1] = r[n - 1] / b[n - 1]
  for (let i = n - 2; i >= 0; --i) {
    p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i]
  }

  for (let i = 0; i < n; i++) {
    p2[i] = 2 * K[i + 1] - p1[i + 1]
  }
  p2[n - 1] = 0.5 * (K[n] + p1[n - 1])

  return { p1, p2 }
}

export default function generateSVGPath(points: any[]) {
  if (points.length < 2) return ''

  const { p1: cp1x, p2: cp2x } = computeControlPoints(points.map((p) => p.x))
  const { p1: cp1y, p2: cp2y } = computeControlPoints(points.map((p) => p.y))

  let d = `M ${points[0].x},${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    d += ` C ${cp1x[i]},${cp1y[i]} ${cp2x[i]},${cp2y[i]} ${points[i + 1].x},${points[i + 1].y}`
  }

  return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <path d="${d}" fill="none" stroke="black" />
    </svg>`
}
