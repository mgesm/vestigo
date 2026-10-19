$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dir = "C:\Users\migue\.gemini\antigravity\scratch\crimenes-imperfectos-valdeluna\documentos-imprimibles"

$items = @(
    @("sobre_a.html", "SOBRE_A_PIEZA_PRINCIPAL.pdf"),
    @("sobre_b.html", "SOBRE_B_PIEZA_SEPARADA_1.pdf"),
    @("sobre_c.html", "SOBRE_C_PIEZA_CONVICCION.pdf"),
    @("extras_inmersion.html", "EXTRAS_INMERSION.pdf"),
    @("dossier_notarial_y_forense.html", "DOSSIER_NOTARIAL_Y_FORENSE.pdf"),
    @("instrucciones_juego.html", "INSTRUCCIONES_DE_JUEGO.pdf")
)

foreach ($pair in $items) {
    $src = Join-Path $dir $pair[0]
    $dst = Join-Path $dir $pair[1]
    $url = "file:///" + $src.Replace("\", "/")
    
    $proc = Start-Process -FilePath $edge -ArgumentList "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=$dst", $url -PassThru -Wait
    
    if (Test-Path $dst) {
        $len = (Get-Item $dst).Length
        $raw = [System.IO.File]::ReadAllText($dst)
        $pages = ([regex]::Matches($raw, "/Type\s*/Page\b")).Count
        Write-Host "OK: $dst | Tamano: $len bytes | Paginas: $pages"
    } else {
        Write-Host "FALLO: No se creo $dst"
    }
}
