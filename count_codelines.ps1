# PowerShell script to count lines in .tsx files

param (
    [string]$directory
)

# Function to count lines
function Count-Lines {
    param (
        [string]$path
    )

    $totalLines = 0
    Get-ChildItem $path -Recurse -Filter *.tsx | ForEach-Object {
        $lineCount = (Get-Content $_.FullName | Measure-Object -Line).Lines
        Write-Host "$($_.FullName): $lineCount"
        $totalLines += $lineCount
    }

    Write-Host "Total lines in .tsx files: $totalLines"
}

# Call the function with the provided directory
Count-Lines -path $directory
