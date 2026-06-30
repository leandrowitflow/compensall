# Download all Figma assets to local public directory
$baseUrl = "https://www.figma.com/api/mcp/asset/"
$publicDir = Join-Path $PSScriptRoot "..\public\assets"

$assets = @(
  # Icons – Know Your Rights / Homepage
  @{ url = "https://www.figma.com/api/mcp/asset/95c3a8e4-cb4e-44a8-8594-6e9652d561ef"; dest = "icons\flight-cancellation.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/6d9e9d8a-8841-4efd-af9f-ce9e7b526e59"; dest = "icons\denied-boarding.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/c3cdf2cc-2104-4889-9eb2-7ea71a0e52ca"; dest = "icons\flight-delay.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/2ebdfb7d-2bb6-48a6-80c0-61387786d0d1"; dest = "icons\missed-connection.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/094e05dd-a964-4974-8b10-aa99e8af149d"; dest = "icons\overbooking.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/61c04b5b-9fc8-445a-8828-10819414b141"; dest = "icons\airline-strike.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/cba6e5e4-a5d1-45d3-886d-36252f67ac94"; dest = "icons\passenger-rights.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/9c07fcff-d6bc-4851-bf4a-1bbf0c183f70"; dest = "icons\passengers-with-disabilities.png" },
  # Airline logos
  @{ url = "https://www.figma.com/api/mcp/asset/3e9c0505-aaab-4fb7-bedd-013583d3c15a"; dest = "airlines\ryanair.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/cf25f088-16e3-4c1d-838b-22e770a2464d"; dest = "airlines\easyjet.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/33e81029-75e8-4c8e-a137-cf098edc3955"; dest = "airlines\british-airways.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/9a1e4561-180f-4984-a264-575488c39b03"; dest = "airlines\wizz-air.png" },
  # Airport logos
  @{ url = "https://www.figma.com/api/mcp/asset/0c0bbc3b-abbb-4938-8838-6d6c17080a82"; dest = "airports\heathrow.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/8395adae-05fd-46ad-a66f-cf5fc2747ac7"; dest = "airports\gatwick.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/2b8b1ea8-1743-4f35-aad8-76bff1b9a5b9"; dest = "airports\manchester.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/dd5c6538-dc34-4c2b-8201-2c58d2fdd33a"; dest = "airports\lisbon.png" },
  # Compensation tier images
  @{ url = "https://www.figma.com/api/mcp/asset/744e4d52-63e4-418d-ad3b-60e44547a6fb"; dest = "compensation\250.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/20da7a09-84f7-467e-bd3d-254894746f09"; dest = "compensation\400.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/19e4ae3c-cadf-475d-9715-36370fdf3ddc"; dest = "compensation\600.png" },
  # Document icons
  @{ url = "https://www.figma.com/api/mcp/asset/ef4ff520-2be4-4e9e-bce9-95a9c23a2f8c"; dest = "documents\privacy-consent.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/641affcc-8df8-4db4-92b2-22256b417256"; dest = "documents\no-win-no-fee.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/03151ae2-c9fa-47a8-8c11-62b5076e986d"; dest = "documents\authority-to-act.png" }
)

$ok = 0; $fail = 0
foreach ($asset in $assets) {
  $outPath = Join-Path $publicDir $asset.dest
  try {
    Invoke-WebRequest -Uri $asset.url -OutFile $outPath -UseBasicParsing -TimeoutSec 30
    Write-Host "OK  $($asset.dest)"
    $ok++
  } catch {
    Write-Host "ERR $($asset.dest): $_"
    $fail++
  }
}
Write-Host "`nDone: $ok downloaded, $fail failed."
