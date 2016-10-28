/* eslint-disable max-len */

const svgs = {

	flourish: `
		<svg version="1.1" id="icon-chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46px" height="54px" viewBox="0 0 46 54" enable-background="new 0 0 46 54" xml:space="preserve" aria-labelledby="chart-title">
			<title id="chart-title">Chart</title>
			<rect y="17" width="10" height="37"></rect>
			<rect x="18" width="10" height="54"></rect>
			<rect x="36" y="27" width="10" height="27"></rect>
		</svg>`,

	closeSvg: `
  	<svg version="1.1" id="icon-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16.641px" height="16.643px" viewBox="243.576 202.087 16.641 16.643" enable-background="new 243.576 202.087 16.641 16.643" xml:space="preserve" aria-labelledby="close-title">
  		<title  id="close-title">Close</title>
  		<line fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="244.826" y1="203.338" x2="258.967" y2="217.479"/>
  		<line fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="244.826" y1="217.479" x2="258.967" y2="203.337"/>
  	</svg>`,

	crossHatchesDefs: `<defs>
  	<pattern id="crosshatch-none" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
  		<rect class="fill-none" width="10" height="10" transform="translate(0,0)"></rect>
  	</pattern>
  	<pattern id="crosshatch-dem" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
  		<rect class="fill-winner-dem" width="8" height="10" transform="translate(0,0)"></rect>
  	</pattern>
  	<pattern id="crosshatch-gop" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
  		<rect class="fill-winner-gop" width="8" height="10" transform="translate(0,0)"></rect>
  	</pattern>
  	<pattern id="crosshatch-ind" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
  		<rect class="fill-winner-ind" width="8" height="10" transform="translate(0,0)"></rect>
  	</pattern>
    <pattern id="crosshatch-yes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <rect class="fill-complete-yes" width="8" height="10" transform="translate(0,0)"></rect>
    </pattern>
    <pattern id="crosshatch-no" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <rect class="fill-complete-no" width="8" height="10" transform="translate(0,0)"></rect>
    </pattern>
    <pattern id="crosshatch-split" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <rect class="fill-winner-split" width="8" height="10" transform="translate(0,0)"></rect>
    </pattern>
  </defs>`,

}

export default svgs
