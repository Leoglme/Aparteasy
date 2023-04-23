<template>
  <aside class="w-full vh-100 bg-white auth-hero">
    <svg width="634" height="100%" viewBox="0 0 634 850" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 100%;">
      <g clip-path="url(#clip0_612_15306)">
        <path opacity="0.7" d="M649.001 437.244L1164.76 183.214L1164.76 493.252L649.225 745.484L649.001 437.244Z" fill="#F8F8FD" stroke="#CCCCF5" stroke-width="4"/>
        <path d="M656.972 -35.6173L1226.01 -315.758L1348.48 -64.6564L657.228 272.488L656.972 -35.6173Z" fill="#F8F8FD" stroke="#CCCCF5" stroke-width="4"/>
        <path d="M499.005 167.244L1014.77 -86.7855L1014.77 263.252L499.229 515.484L499.005 167.244Z" stroke="#CCCCF5" stroke-width="4"/>
        <path d="M230.005 534.244L745.767 280.214L745.767 590.252L230.229 842.484L230.005 534.244Z" stroke="#CCCCF5" stroke-width="4"/>
        <path d="M-274.028 670.383L295.007 390.242L417.478 641.344L-273.772 978.488L-274.028 670.383Z" stroke="#CCCCF5" stroke-width="4"/>

      </g>
      <defs>
        <clipPath id="clip0_612_15306">
          <rect width="634" height="850" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </aside>

</template>


<style lang="scss" scoped>
@import "src/assets/style/core/mixins";
.auth-hero {
  @include down(900){
    display: none;
  }
}
</style>
