@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
powershell.exe -command choco install -y google-chrome-x64 git steam qbittorrent notepadplusplus vlc 7zip handbrake vscode nodejs
