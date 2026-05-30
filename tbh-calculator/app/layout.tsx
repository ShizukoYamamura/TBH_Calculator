import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ★ ここをツールの名前に書き換えます
export const metadata: Metadata = {
  title: "TBH DPS Calculator",
  description: "Task Bar Heroの非公式DPS計算機・ステータスシミュレーター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ★ ついでに html lang も "en" から "ja" に変更しておくと良いです
    <html lang="ja">
<head>
        {/* ★ここにAdSenseの大元コードを配置 */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9908835148006630"
          crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}