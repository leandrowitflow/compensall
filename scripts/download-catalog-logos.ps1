# Download airline and airport logos into public/assets
# Airlines: Kiwi CDN (IATA codes)
# Airports: Wikimedia Commons thumbnails (curated)

$ErrorActionPreference = "Continue"
$headers = @{ "User-Agent" = "CompensallLogoDownloader/1.0 (https://compensall.vercel.app)" }
$root = Join-Path $PSScriptRoot "..\public\assets"
$airlinesDir = Join-Path $root "airlines"
$airportsDir = Join-Path $root "airports"

New-Item -ItemType Directory -Force -Path $airlinesDir, $airportsDir | Out-Null

$airlineCodes = @{
  "ryanair" = "FR"
  "easyjet" = "U2"
  "british-airways" = "BA"
  "wizz-air" = "W6"
  "tap" = "TP"
  "lufthansa" = "LH"
  "eurowings" = "EW"
  "air-france" = "AF"
  "transavia-france" = "TO"
  "klm" = "KL"
  "transavia" = "HV"
  "iberia" = "IB"
  "iberia-express" = "I2"
  "vueling" = "VY"
  "air-europa" = "UX"
  "ita-airways" = "AZ"
  "brussels-airlines" = "SN"
  "aer-lingus" = "EI"
  "jet2" = "LS"
  "eastern-airways" = "T3"
  "tui-airways" = "BY"
  "virgin-atlantic" = "VS"
  "sas" = "SK"
  "norwegian" = "DY"
  "finnair" = "AY"
  "swiss" = "LX"
  "austrian" = "OS"
  "lot" = "LO"
  "aegean" = "A3"
  "condor" = "DE"
  "volotea" = "V7"
  "croatia-airlines" = "OU"
  "tarom" = "RO"
  "luxair" = "LG"
  "icelandair" = "FI"
  "air-baltic" = "BT"
  "smartwings" = "QS"
  "sunexpress" = "XQ"
}

$airportLogos = @{
  "heathrow" = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Heathrow_Airport_Logo.svg/250px-Heathrow_Airport_Logo.svg.png"
  "gatwick" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LGW_airport_logo.svg/250px-LGW_airport_logo.svg.png"
  "manchester" = "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Manchester_Airport_logo.svg/250px-Manchester_Airport_logo.svg.png"
  "lisbon" = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Logo_LIS_en.svg/250px-Logo_LIS_en.svg.png"
  "stansted" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/London_Stansted_Airport_logo.svg/250px-London_Stansted_Airport_logo.svg.png"
  "luton" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/London_Luton_Airport_logo.svg/250px-London_Luton_Airport_logo.svg.png"
  "birmingham" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Birmingham_Airport_logo.svg/250px-Birmingham_Airport_logo.svg.png"
  "edinburgh" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Edinburgh_Airport_logo.svg/250px-Edinburgh_Airport_logo.svg.png"
  "glasgow" = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Glasgow_Airport_logo.svg/250px-Glasgow_Airport_logo.svg.png"
  "bristol" = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bristol_Airport_logo.svg/250px-Bristol_Airport_logo.svg.png"
  "porto" = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/OPO_airport_logo.svg/250px-OPO_airport_logo.svg.png"
  "faro" = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/FAO_airport_logo.svg/250px-FAO_airport_logo.svg.png"
  "madrid" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aena_logo.svg/250px-Aena_logo.svg.png"
  "barcelona" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aena_logo.svg/250px-Aena_logo.svg.png"
  "malaga" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aena_logo.svg/250px-Aena_logo.svg.png"
  "palma" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aena_logo.svg/250px-Aena_logo.svg.png"
  "paris-cdg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Groupe_ADP_logo.svg/250px-Groupe_ADP_logo.svg.png"
  "paris-orly" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Groupe_ADP_logo.svg/250px-Groupe_ADP_logo.svg.png"
  "nice" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Groupe_ADP_logo.svg/250px-Groupe_ADP_logo.svg.png"
  "lyon" = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Logo-lyon-aeroport.svg/250px-Logo-lyon-aeroport.svg.png"
  "frankfurt" = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Frankfurt_Airport_Logo_2019.svg/250px-Frankfurt_Airport_Logo_2019.svg.png"
  "munich" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Flughafen_M%C3%BCnchen_Logo.svg/250px-Flughafen_M%C3%BCnchen_Logo.svg.png"
  "berlin" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Flughafen_Berlin_Brandenburg_Logo.svg/250px-Flughafen_Berlin_Brandenburg_Logo.svg.png"
  "dusseldorf" = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Flughafen_D%C3%BCsseldorf_logo.svg/250px-Flughafen_D%C3%BCsseldorf_logo.svg.png"
  "hamburg" = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flughafen_Hamburg_Logo.svg/250px-Flughafen_Hamburg_Logo.svg.png"
  "rome-fiumicino" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Aeroporti_di_Roma_logo.svg/250px-Aeroporti_di_Roma_logo.svg.png"
  "milan-malpensa" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/SEA_Milan_Airports_logo.svg/250px-SEA_Milan_Airports_logo.svg.png"
  "milan-linate" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/SEA_Milan_Airports_logo.svg/250px-SEA_Milan_Airports_logo.svg.png"
  "venice" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/SAVE_S.p.A._logo.svg/250px-SAVE_S.p.A._logo.svg.png"
  "amsterdam" = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/AMS_airport_logo.svg/250px-AMS_airport_logo.svg.png"
  "brussels" = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Brussels_Airport_logo.svg/250px-Brussels_Airport_logo.svg.png"
  "dublin" = "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Dublin_Airport_logo.svg/250px-Dublin_Airport_logo.svg.png"
  "warsaw" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Polish_Airports_logo.svg/250px-Polish_Airports_logo.svg.png"
  "krakow" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Polish_Airports_logo.svg/250px-Polish_Airports_logo.svg.png"
  "athens" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Athens_International_Airport_logo.svg/250px-Athens_International_Airport_logo.svg.png"
  "vienna" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Flughafen_Wien_Logo.svg/250px-Flughafen_Wien_Logo.svg.png"
  "zurich" = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flughafen_Z%C3%BCrich_Logo.svg/250px-Flughafen_Z%C3%BCrich_Logo.svg.png"
  "geneva" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Logo_Gen%C3%A8ve_A%C3%A9roport.svg/250px-Logo_Gen%C3%A8ve_A%C3%A9roport.svg.png"
  "copenhagen" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/CPH-logo.svg/250px-CPH-logo.svg.png"
  "oslo" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Avinor_logo.svg/250px-Avinor_logo.svg.png"
  "stockholm" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Swedavia_logo.svg/250px-Swedavia_logo.svg.png"
  "helsinki" = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Finavia_logo.svg/250px-Finavia_logo.svg.png"
  "prague" = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/PRG_airport_logo.svg/250px-PRG_airport_logo.svg.png"
  "budapest" = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/BUD_airport_logo.svg/250px-BUD_airport_logo.svg.png"
  "bucharest" = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bucharest_Airport_Logo.svg/250px-Bucharest_Airport_Logo.svg.png"
}

function Download-Asset {
  param([string]$Url, [string]$OutPath)
  try {
    Invoke-WebRequest -Uri $Url -OutFile $OutPath -Headers $headers -UseBasicParsing
    return $true
  } catch {
    Write-Host "ERR  $OutPath"
    return $false
  }
}

$ok = 0; $fail = 0
foreach ($entry in $airlineCodes.GetEnumerator()) {
  $out = Join-Path $airlinesDir "$($entry.Key).png"
  $url = "https://images.kiwi.com/airlines/128/$($entry.Value).png"
  if (Download-Asset -Url $url -OutPath $out) { Write-Host "OK   airlines\$($entry.Key).png"; $ok++ } else { $fail++ }
  Start-Sleep -Milliseconds 200
}

foreach ($entry in $airportLogos.GetEnumerator()) {
  $out = Join-Path $airportsDir "$($entry.Key).png"
  if (Download-Asset -Url $entry.Value -OutPath $out) { Write-Host "OK   airports\$($entry.Key).png"; $ok++ } else { $fail++ }
  Start-Sleep -Seconds 2
}

Write-Host "`nDone: $ok downloaded, $fail failed."
