#!/bin/bash
is_clang_running() {
    if [[ "$(pidof clang++ | wc -l)" -eq 1 ]]; then echo YES; else echo NO; fi
}
is_lld_running() {
    if [[ "$(pidof ld.lld | wc -l)" -eq 1 ]]; then echo YES; else echo NO; fi
}

is_bee_backend_running() {
    if [[ "$(pidof bee_backend | wc -l)" -eq 1 ]]; then echo YES; else echo NO; fi
}

loop() {
    if [[ $(is_clang_running) == "YES" || $(is_lld_running) == "YES" && $(is_bee_backend_running) == "YES" ]]; then
        # We should wait more
        sleep 2 && return
    fi

    if [[ $(is_bee_backend_running) == "YES" ]]; then echo q >/proc/"$(pidof bee_backend)"/fd/0 && exit 0; fi
}

while true; do loop; done
