#!/bin/bash

# Constants
SLEEP_SHORT=2
SLEEP_LONG=10

# Generic function to check if a process is running
is_process_running() {
  local process_name=$1
  if [[ "$(pidof "$process_name" | wc -l)" -eq 1 ]]; then
    echo "YES"
  else
    echo "NO"
  fi
}

# Check if a process is running and exit if it's not
check_process_running() {
  local process_name=$1
  if [[ "$(is_process_running "$process_name")" != "YES" ]]; then
    echo "Error: $process_name is not running" >&2
    exit 1
  fi
}

loop() {
  # Check if il2cpp or bee_backend is running
  if [[ "$(is_process_running "il2cpp")" != "YES" && "$(is_process_running "bee_backend")" != "YES" ]]; then
    sleep "$SLEEP_LONG"
    return
  fi

  # Check if clang++ or ld.lld is running and bee_backend is running
  if [[ "$(is_process_running "clang++")" == "YES" || "$(is_process_running "ld.lld")" == "YES" && "$(is_process_running "bee_backend")" == "YES" ]]; then
    # We should wait more
    sleep "$SLEEP_SHORT"
    return
  fi

  # Send input to bee_backend and exit
  if [[ "$(is_process_running "bee_backend")" == "YES" ]]; then
    echo "q" >/proc/"$(pidof "bee_backend")"/fd/0
    exit 0
  fi
}

while true; do
  loop
done
