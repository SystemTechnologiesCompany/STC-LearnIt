$ErrorActionPreference = 'Stop'
$ffmpeg = 'C:\Users\stalo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$screens = Join-Path $root 'capture\screenshots'
$leader = Join-Path $root 'leaderboard-capture\screenshots'
$renders = Join-Path $root 'renders\vertical'
$screenAssets = Join-Path $renders 'screens'
$font = 'C\:/Windows/Fonts/arialbd.ttf'
New-Item -ItemType Directory -Force -Path $renders | Out-Null
New-Item -ItemType Directory -Force -Path $screenAssets | Out-Null

$sourceHero = Join-Path $screens 'scroll-000.png'
$sourceFaculties = Join-Path $screens 'scroll-032.png'
$sourceLessons = Join-Path $screens 'scroll-064.png'
$sourceProgress = Join-Path $screens 'scroll-097.png'
$sourceLeaderboard = Join-Path $leader 'scroll-000.png'
$sourceEnd = Join-Path $screens 'home-end.png'
$cropSpecs = @(
  @{ Source=$sourceHero; Crop='crop=700:420:1100:195'; Grade='' },
  @{ Source=$sourceHero; Crop='crop=1760:700:80:130'; Grade='' },
  @{ Source=$sourceFaculties; Crop='crop=1050:520:190:310'; Grade='' },
  @{ Source=$sourceProgress; Crop='crop=870:340:870:300'; Grade='' },
  @{ Source=$sourceLessons; Crop='crop=720:380:600:500'; Grade='' },
  @{ Source=$sourceProgress; Crop='crop=840:300:880:310'; Grade='' },
  @{ Source=$sourceLeaderboard; Crop='crop=620:380:680:700'; Grade='' },
  @{ Source=$sourceHero; Crop='crop=700:420:1100:195'; Grade='colorize=hue=220:saturation=0.3:lightness=0.4,eq=brightness=-0.12:contrast=1.05' },
  @{ Source=$sourceHero; Crop='crop=700:420:1100:195'; Grade='colorize=hue=325:saturation=0.3:lightness=0.4,eq=brightness=-0.12:contrast=1.05' }
)
$files = @()
for ($i=0; $i -lt $cropSpecs.Count; $i++) {
  $path = Join-Path $screenAssets ("screen-{0:D2}.png" -f ($i+1))
  $files += $path
  $vf = $cropSpecs[$i].Crop + ',scale=920:-1:flags=lanczos'
  if ($cropSpecs[$i].Grade) { $vf += ',' + $cropSpecs[$i].Grade }
  $vf += ',format=rgba'
  & $ffmpeg -hide_banner -loglevel error -y -i $cropSpecs[$i].Source -vf $vf -frames:v 1 $path
  if ($LASTEXITCODE -ne 0) { throw "Visual crop $($i+1) failed." }
}

$titles = @('YOUR NEXT LEVEL','MEET STC LEARNIT','EXPLORE FACULTIES','YOUR LEARNING PATH','LEARN BY DOING','LEVEL UP','THE LEADERBOARD','MAKE IT YOURS','STC')
$subs = @('starts with one small step.','A smarter way to study university.','Choose your subject and speciality.','A clear journey, made for you.','Concepts, quizzes and games.','Pass exams. Earn XP. Keep climbing.','Take your place among the top.','Galaxy nights. Sakura days.','The way to greatness.')
$accents = @('0x63E5A6','0x63E5A6','0x63E5A6','0x63E5A6','0x63E5A6','0x63E5A6','0x63E5A6','0x9BC5FF','0xFF9CCB')
$backgrounds = @(
  '0x0B3826','0x0A3023','0x0B3826','0x0B3826','0x0B3826','0x0B3826','0x0B3826','0x182A4A','0x30152D'
)
$imageColorize = @('','','','','','','','colorize=hue=220:saturation=0.38:lightness=0.34,eq=brightness=-0.16:contrast=1.05','colorize=hue=325:saturation=0.34:lightness=0.38,eq=brightness=-0.14:contrast=1.05')
$clips = @()

for ($i=0; $i -lt $files.Count; $i++) {
  $scene = Join-Path $renders ("scene-{0:D2}.mp4" -f ($i+1))
  $clips += $scene
  if (Test-Path $scene) { continue }
  $bg = "gradients=size=1080x1920:rate=30:duration=4.2:type=radial:speed=0.035:c0=$($backgrounds[$i]):c1=0x020706:c2=0x07140F:c3=0x0B2018:nb_colors=4"
  if ($i -ge 7) { $bg = "gradients=size=1080x1920:rate=30:duration=4.2:type=radial:speed=0.035:c0=$($backgrounds[$i]):c1=0x050711:c2=0x0E1B31:c3=0x10192B:nb_colors=4" }
  if ($i -eq 8) { $bg = "gradients=size=1080x1920:rate=30:duration=4.2:type=radial:speed=0.035:c0=0x7E235F:c1=0x100810:c2=0x291725:c3=0x180D19:nb_colors=4" }
  $head = $titles[$i]
  $sub = $subs[$i]
  $accent = $accents[$i]
  $uiFilter = 'scale=920:-1:flags=lanczos,format=rgba'
  if ($imageColorize[$i]) { $uiFilter += ',' + $imageColorize[$i] }
  $filter = "[0:v]format=rgba,drawgrid=width=120:height=120:thickness=1:color=${accent}@0.045,drawbox=x=64:y=822:w=952:h=586:color=${accent}@0.62:t=4,drawbox=x=88:y=188:w=76:h=4:color=${accent}:t=fill,drawtext=fontfile='$font':text='STC LEARNIT  /  0$($i+1)':fontcolor=${accent}:fontsize=24:x=88:y=218,drawtext=fontfile='$font':text='$head':fontcolor=white:fontsize=65:x=88:y='420+20*(1-min(t/0.45,1))':alpha='min(t/0.3,1)',drawtext=fontfile='$font':text='$sub':fontcolor=0xEAF5EF:fontsize=34:x=92:y=520:alpha='if(lt(t,0.22),0,min((t-0.22)/0.35,1))',drawtext=fontfile='$font':text='ALGERIA  /  ALL FACULTIES  /  ONE JOURNEY':fontcolor=${accent}:fontsize=20:x=88:y=1550,drawbox=x=840:y=715:w=10:h=10:color=${accent}:t=fill,drawbox=x=915:y=620:w=5:h=5:color=white@0.8:t=fill[bg];[1:v]$uiFilter,fade=t=in:st=0.25:d=0.35:alpha=1[ui];[bg][ui]overlay=x=80:y='852+sin(t*1.35)*14':shortest=1,format=yuv420p[v]"
  & $ffmpeg -hide_banner -loglevel error -y -f lavfi -i $bg -loop 1 -framerate 30 -i $files[$i] -filter_complex $filter -map '[v]' -frames:v 126 -c:v libx264 -preset medium -crf 18 -an $scene
  if ($LASTEXITCODE -ne 0) { throw "Vertical scene $($i+1) render failed." }
}

$args = @('-hide_banner','-loglevel','error','-y')
foreach ($clip in $clips) { $args += @('-i',$clip) }
$parts = @()
$last = '[0:v]'
for ($i=1; $i -lt $clips.Count; $i++) {
  $next = "[x$i]"
  $offset = [math]::Round(3.86*$i,2).ToString([cultureinfo]::InvariantCulture)
  $parts += "$last[$i`:v]xfade=transition=$(@('circleopen','smoothleft','radial','wipeleft','circleclose','smoothright','zoomin','fade')[$i-1]):duration=0.34:offset=$offset$next"
  $last = $next
}
$filterComplex = ($parts -join ';') + ";$last" + 'format=yuv420p[v]'
$args += @('-filter_complex',$filterComplex,'-map','[v]','-r','30','-c:v','libx264','-preset','slow','-crf','18','-an',(Join-Path $renders 'visuals-vertical.mp4'))
& $ffmpeg @args
if ($LASTEXITCODE -ne 0) { throw 'Vertical scene assembly failed.' }

$narration = Join-Path $root 'narration.mp3'
$final = Join-Path $renders 'STC-Learnit-vertical-cinematic.mp4'
& $ffmpeg -hide_banner -loglevel error -y -i (Join-Path $renders 'visuals-vertical.mp4') -i $narration -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -t 35.08 -movflags +faststart $final
if ($LASTEXITCODE -ne 0) { throw 'Final vertical narration mux failed.' }
Write-Output "Created $final"
