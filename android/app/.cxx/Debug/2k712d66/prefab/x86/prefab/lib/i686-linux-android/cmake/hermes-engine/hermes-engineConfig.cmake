if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/inbeomjin/.gradle/caches/8.13/transforms/0f6949dc0759ac1fdbb05ba39e0a76d4/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/inbeomjin/.gradle/caches/8.13/transforms/0f6949dc0759ac1fdbb05ba39e0a76d4/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

