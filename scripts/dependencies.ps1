Function Step-Main {
    Param (
		[string]$Command = "default",
		[string]$Manager = "yarn"
    )

    Process {
        switch ( $Command ) {
            clear {
                Remove-Item -Recurse -Force -ErrorAction Ignore dist
				Remove-Item -Recurse -Force -ErrorAction Ignore node_modules
				switch ($Manager) {
					yarn { Remove-Item -Recurse -Force -ErrorAction Ignore $(yarn cache dir) }
					npm { npm cache rm --force }
				}
			}
			install {
				switch ($Manager) {
					yarn { yarn install }
					npm { npm install }
				}
			}
			lockfile {
				switch ($Manager) {
					yarn {
						Remove-Item -Force -ErrorAction Ignore yarn.lock
						yarn install
					}
					npm {
						Remove-Item -Force -ErrorAction Ignore package-lock.json
						npm install
					}
				}
            }
            default { Write-Host "Unrecognized command, please try again" -ForegroundColor Red }
        }
    }
}

Step-Main @args
