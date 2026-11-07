$ErrorActionPreference = 'Stop'
$ffmpeg = 'C:\Users\stalo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$screens = Join-Path $root 'capture\screenshots'
$leader = Join-Path $root 'leaderboard-capture\screenshots'
$renders = Join-Path $root 'renders'
$font = 'C\:/Windows/Fonts/arialbd.ttf'
$files = @(
  (Join-Path $screens 'scroll-000.png'),
  (Join-Path $screens 'scroll-032.png'),
  (Join-Path $screens 'scroll-064.png'),
  (Join-Path $screens 'scroll-097.png'),
  (Join-Path $leader 'scroll-000.png'),
  (Join-Path $screens 'scroll-000.png'),
  (Join-Path $screens 'scroll-000.png'),
  (Join-Path $screens 'home-end.png')
)
$heads = @('YOUR NEXT LEVEL','MEET STC LEARNIT','FIND YOUR SUBJECT','LEARN. PLAY. GROW.','TAKE YOUR PLACE','GALAXY THEME','SAKURA THEME','THE WAY TO GREATNESS')
$subs = @('One small step changes your journey.','A smarter way to study university subjects.','Explore faculties and choose your path.','Concepts, quizzes, games and practice.','Pass exams. Earn XP. Climb the leaderboard.','Make your study space yours.','A softer way to focus and learn.','Study your way, wherever ambition takes you.')
$accents = @('0xBFEA62','0xBFEA62','0xBFEA62','0xBFEA62','0xBFEA62','0x9BC5FF','0xFF9CCB','0xBFEA62')
$clips = @()
for ($i=0; $i -lt $files.Count; $i++) {
  $out = Join-Path $renders ("scene-{0:D2}.mp4" -f ($i+1))
  $clips += $out
  $filters = "zoompan=z='min(zoom+0.00025,1.045)':x='iw/2-(iw/zoom/2)+sin(on/42)*14':y='ih/2-(ih/zoom/2)':d=138:s=1920x1080:fps=30,drawbox=x=0:y=720:w=1920:h=360:color=0x080B17@0.82:t=fill,drawbox=x=120:y=752:w=88:h=4:color=$($accents[$i]):t=fill,drawtext=fontfile='$font':text='$($heads[$i])':fontcolor=$($accents[$i]):fontsize=62:x=120:y=788,drawtext=fontfile='$font':text='$($subs[$i])':fontcolor=0xF4F2EC:fontsize=28:x=124:y=878,format=yuv420p"
  if ($i -eq 5) { $filters = "colorbalance=rs=0.08:gs=0.04:bs=0.16,$filters" }
  if ($i -eq 6) { $filters = "colorbalance=rs=0.17:gs=-0.03:bs=0.06,$filters" }
  & $ffmpeg -hide_banner -loglevel error -y -loop 1 -framerate 30 -i $files[$i] -vf $filters -frames:v 138 -c:v libx264 -preset medium -crf 18 -an $out
  if ($LASTEXITCODE -ne 0) { throw "Scene $($i+1) render failed." }
}
$args = @('-hide_banner','-loglevel','error','-y')
foreach ($c in $clips) { $args += @('-i',$c) }
$fc = '[0:v][1:v]xfade=transition=fade:duration=0.25:offset=4.35[x1];[x1][2:v]xfade=transition=fade:duration=0.25:offset=8.70[x2];[x2][3:v]xfade=transition=fade:duration=0.25:offset=13.05[x3];[x3][4:v]xfade=transition=fade:duration=0.25:offset=17.40[x4];[x4][5:v]xfade=transition=fade:duration=0.25:offset=21.75[x5];[x5][6:v]xfade=transition=fade:duration=0.25:offset=26.10[x6];[x6][7:v]xfade=transition=fade:duration=0.25:offset=30.45,format=yuv420p[v]'
$args += @('-filter_complex',$fc,'-map','[v]','-c:v','libx264','-preset','slow','-crf','18','-r','30','-an',(Join-Path $renders 'visuals.mp4'))
& $ffmpeg @args
if ($LASTEXITCODE -ne 0) { throw 'Visual sequence assembly failed.' }
$narration = Join-Path $root 'narration.mp3'
$final = Join-Path $renders 'STC-Learnit-promo.mp4'
& $ffmpeg -hide_banner -loglevel error -y -i (Join-Path $renders 'visuals.mp4') -i $narration -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -t 35.08 -movflags +faststart $final
if ($LASTEXITCODE -ne 0) { throw 'Final audio mux failed.' }
Write-Output "Created $final"
