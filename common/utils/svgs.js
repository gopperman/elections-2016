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

  twitterSvg: `
    <svg version="1.1" id="icon-twitter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="16.253px" viewBox="2.305 1.874 20 16.253" enable-background="new 2.305 1.874 20 16.253" xml:space="preserve" aria-labelledby="twitter-title">
      <title id="twitter-title">Tweet this</title>
      <g>
        <path d="M22.291,3.825c-0.572,0.841-1.258,1.556-2.05,2.126c0.017,0.129,0.017,0.302,0.017,0.525c0,1.111-0.156,2.206-0.475,3.301
        c-0.319,1.093-0.809,2.14-1.46,3.161c-0.651,1.013-1.43,1.901-2.334,2.665c-0.92,0.763-2.014,1.366-3.285,1.842
        c-1.273,0.477-2.635,0.701-4.096,0.682c-2.287,0-4.398-0.618-6.303-1.843c0.301,0.032,0.636,0.051,0.999,0.051
        c1.904,0,3.602-0.588,5.096-1.763c-0.889-0.016-1.683-0.286-2.396-0.808c-0.7-0.538-1.174-1.207-1.444-2.03
        c0.271,0.046,0.523,0.064,0.762,0.064c0.365,0,0.73-0.03,1.078-0.128c-0.934-0.189-1.729-0.668-2.364-1.414
        C3.401,9.51,3.082,8.638,3.101,7.635V7.588C3.672,7.907,4.289,8.081,4.94,8.113C4.385,7.731,3.923,7.257,3.59,6.652
        C3.26,6.065,3.101,5.415,3.101,4.7c0-0.745,0.19-1.43,0.571-2.081c1.029,1.269,2.269,2.285,3.729,3.033
        c1.459,0.762,3.032,1.191,4.714,1.285c-0.064-0.318-0.095-0.634-0.095-0.936c0-1.143,0.396-2.111,1.206-2.921
        c0.809-0.811,1.779-1.206,2.922-1.206c1.174,0,2.175,0.428,2.998,1.303c0.921-0.174,1.792-0.522,2.588-1
        c-0.317,0.967-0.903,1.715-1.794,2.253c0.791-0.095,1.566-0.303,2.365-0.635L22.291,3.825z" />
      </g>
    </svg>
  `,

	globeLogo: `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="140px" height="18.674px" viewBox="0 0 140 18.674" enable-background="new 0 0 140 18.674" xml:space="preserve" aria-labelledby="g-logo-title">
    <title id="g-logo-title">Boston Globe</title>
    <a xlink:href="http://www.bostonglobe.com"></a>
    <g>
      <path d="M129.334,11.479c0,1.375-0.062,4.065-0.062,4.16l-0.095,0.094l-2.597-1.625V7.727c0.406-0.625,0.97-0.938,1.471-0.938
      c0.594,0,1.03,0.438,1.249,1.032C129.3,8.071,129.334,9.729,129.334,11.479 M137.902,8.885l-2.408,1.97V6.383L137.902,8.885z
       M131.521,14.546c-0.156-1.406-0.123-5.225-0.123-7.006c0-1.157-1.004-2.002-2.254-2.534l-2.564,2.158V2.472
      c0-0.781,0.47-1.626,1.031-1.626V0.689c-1.219,0-2.563,0.971-2.783,1.597c-0.28-0.47-0.938-0.752-1.562-0.752l-0.031,0.25
      c0.625,0,1.221,1.064,1.221,2.941c0,3.784-0.033,7.413-0.033,8.974c0,0.503-0.062,0.847-0.344,1.253l3.849,2.345
      C129.395,15.923,129.958,15.517,131.521,14.546 M140,13.952l-0.189-0.189c-0.97,0.971-1.533,1.377-2.095,1.377
      c-0.563,0-1.096-0.345-2.222-1.22v-2.563l4.41-3.536c-1.032-0.875-3.158-3.002-3.158-3.002c-1.189,1.064-1.878,1.658-3.535,2.815
      c0.062,0.344,0.125,0.812,0.125,1.188v4.973c0,0.345-0.031,0.595-0.156,1l3.473,2.438L140,13.952z M98.868,11.979
      c0,0.846-0.252,1.377-0.813,1.814c-1.281-1.251-1.906-3.003-1.906-4.754c0-2.626,0.906-3.629,2.158-4.535
      c0.188-0.157,0.375-0.282,0.562-0.406V11.979z M102.247,15.576c-1.658-0.124-2.938-0.687-3.94-1.531
      c1.529-1.062,2.502-1.594,2.502-3.223v-8.1l0.469-0.374c0.345,0.124,0.625,0.249,0.971,0.374L102.247,15.576L102.247,15.576z
       M107.125,11.886c0,0.909-0.094,1.534-0.343,2.286c-0.907,0.905-2.255,1.438-3.786,1.438h-0.438v-8.04
      c0.281-0.032,0.531-0.063,0.782-0.063C105.593,7.508,107.125,9.541,107.125,11.886 M105.904,4.474l-3.346,2.971V2.848
      C103.748,3.317,104.812,3.88,105.904,4.474 M120.355,15.422l-0.188,0.124l-2.657-1.688V6.383l2.814,1.375L120.355,15.422z
       M109.223,1.784l-0.283-0.25l-1.029,1.095c0,0-2.66-0.875-4.818-2.126c-2.971,2.251-5.223,3.846-8.131,5.911
      c-0.689,1.031-1.064,2.376-1.064,3.849c0,4,3.691,7.129,8.353,7.129c3.032-1.281,5.19-3.064,6.787-5.224
      c0.094-0.437,0.125-1.063,0.125-1.407c0-2.909-1.972-4.535-4.065-5.035L109.223,1.784z M122.671,6.632l-3.753-1.938
      c-1.159,1.062-2.284,1.844-3.784,2.594c0.093,0.283,0.188,1.44,0.188,2.16v5.162c-0.346,0.373-0.69,0.562-1.033,0.562
      c-0.344,0-0.719-0.158-1.189-0.501V2.16c0-0.72,0.438-1.565,1.004-1.565V0.503c-1.158,0-2.191,0.53-2.502,1.406
      c-0.283-0.469-0.721-0.875-1.377-0.875l-0.031,0.126c0.375,0,0.75,1.062,0.75,2.062v10.042c0,0.969-0.127,1.471-0.5,2.002
      l2.502,1.813l2.345-2.033l3.63,2.188c1.375-1.281,2.189-2.032,3.721-2.938c-0.093-0.471-0.125-1.377-0.125-1.752V8.103
      C122.514,7.352,122.546,6.945,122.671,6.632 M63.275,15.671c-0.908-0.812-2.158-1.499-4.16-1.499l3.065-3.254l1.062,0.937
      L63.275,15.671z M64.307,8.134l-2.626,2.846l-1.157-0.845V6.351C61.712,7.164,62.398,7.602,64.307,8.134 M77.225,15.733
      L77.1,15.829l-2.502-1.533v-7.82l2.627,1.564V15.733z M79.663,14.576c-0.124-0.404-0.155-0.813-0.155-1.188V6.82L76.1,4.911
      c-1.096,1.095-2.349,1.876-3.94,2.753c0.093,0.312,0.155,0.812,0.155,1.157v5.536c-0.5,0.533-1.002,0.846-1.438,0.846
      c-0.437,0-0.876-0.188-1.346-0.688c0-0.438,0.032-5.192,0.032-8.101H72V5.819l-2.438-0.093c0,0,0.031-2.283,0.062-2.753h-0.281
      l-3.41,3.597c-1.47-0.219-2.564-0.75-4.16-1.844c-1.25,1.281-2.096,1.875-3.596,2.595c0.062,0.751,0.093,1.157,0.093,1.909
      c0,0.875,0,1.158-0.062,1.91l2.002,1.405l-1.877,1.972c-0.812,0.844-1.125,1.531-1.125,2.219c0,0.627,0.25,1.125,0.625,1.597
      l0.22-0.124c-0.25-0.377-0.407-0.814-0.407-1.221c0-0.656,0.344-1.221,1.314-1.221c0.97,0,2.033,0.625,3.097,1.469
      c1.188-1.094,2.065-1.812,3.377-2.469v-3.19c0-0.376,0.032-0.532,0.125-0.782L63.556,9.45l2.566-2.785h1.188
      c0,2.846-0.031,6.506-0.031,6.912c0,0.501-0.094,1.127-0.437,1.627l2.846,2.095l2.44-2.22l3.534,2.312
      C77.038,16.108,78.132,15.267,79.663,14.576 M91.018,15.015L90.8,14.767l-1.065,0.904c-0.529,0-0.905-0.374-0.905-0.969
      c0-0.53,0.032-6.725,0.063-7.788c-0.408-0.815-0.939-1.439-2.129-1.846l-2.847,2.095c0-0.875-0.5-1.657-1.47-2.158l-1.658,1.409
      l0.877,0.938c0,0-0.031,5.504-0.031,6.411c0,0.909-0.656,1.565-0.656,1.565l2.597,1.905l1.377-1.688l-1.034-0.938V7.727
      c0.501-0.656,1.034-0.938,1.503-0.938c0.531,0,0.97,0.375,1.095,0.908c0.03,0.406,0.03,1.062,0.03,1.751
      c0,1.062,0,4.814-0.03,6.285c0.188,0.658,1.156,1.563,1.782,1.563L91.018,15.015z M45.227,10.354l-0.062,4.502
      c-0.468,0.252-0.781,0.408-1.219,0.72c-0.343-0.218-0.688-0.438-1.095-0.687V9.072L45.227,10.354z M45.572,6.445
      c0,0.687-0.625,1.032-2.722,2.345V6.788c0-1,0.063-1.563,0.094-1.97h-0.437c0.062,0.438,0.094,0.97,0.094,1.97v7.979
      c-1.313-0.783-2.909-1.598-4.599-1.723c1.596-0.906,3.19-2.126,3.19-3.91V5.225c0-1.25,0.5-2.003,1.815-3.127
      c1.031,1.532,1.439,2.188,2.251,3.566C45.446,5.975,45.572,6.289,45.572,6.445 M54.423,15.671l-0.125,0.096l-2.471-1.504V6.351
      l2.596,1.47V15.671z M41.475,1.565l-0.062-0.188c-1.314,0-2.033-0.157-2.722-0.281c-0.657-0.094-1.22-0.22-2.001-0.22
      c-2.064,0-3.409,1.064-3.409,2.785c0,0.719,0.156,1.125,0.625,1.657l0.188-0.187c-0.25-0.313-0.375-0.626-0.375-0.971
      c0-0.75,0.625-1.407,2.001-1.407c1.032,0,1.97,0.188,2.784,0.375c-1.751,1.281-2.816,2.22-2.816,4.941
      c-0.25-0.094-0.594-0.156-1.063-0.156c-1.313,0-2.001,0.875-2.001,1.719c0,0.377,0.093,0.783,0.344,1.064l0.219-0.125
      c-0.094-0.188-0.157-0.377-0.157-0.562c0-0.563,0.438-1.002,1.251-1.002c0.72,0,1.251,0.312,1.501,0.752
      c0,1.906-0.375,2.877-1.375,2.877v0.219c1.501,0,3.314-1.095,3.314-2.846V6.507C37.721,3.629,39.41,2.286,41.475,1.565
       M48.012,9.479l-2.785-1.845c1.064-0.657,1.408-0.845,1.783-1.126c0.658-0.47,0.845-0.751,0.845-1.032
      c0-0.219-0.094-0.625-0.594-1.376c-0.625-0.938-1.22-1.846-2.471-3.596c-1.751,1.188-2.721,1.906-4.566,3.346
      c-0.75,0.594-1.314,1.532-1.314,2.721c0,0.407,0.032,2.502,0.032,3.879c0,1.062-0.188,1.627-1.314,2.564
      c-2.721,0-4.348,1.752-4.348,3.502c0,0.752,0.25,1.533,0.813,2.158l0.188-0.188c-0.345-0.377-0.625-0.971-0.625-1.657
      c0-0.938,0.688-1.972,2.846-1.972c2.377,0,4.597,1.627,5.88,2.408c1.845-1.562,3.003-2.221,5.38-3.004v-3.972
      C47.761,10.011,47.855,9.729,48.012,9.479 M56.957,6.757L53.36,4.786c-1.096,1.096-2.502,1.971-4.097,2.847
      c0.219,0.657,0.155,1.5,0.155,2.564c0,2.598,0.031,4.005-0.438,4.692l3.971,2.439c1.096-1.128,2.284-2.002,3.88-2.878
      c-0.125-0.407-0.157-0.813-0.157-1.188v-4.44C56.675,7.508,56.8,7.039,56.957,6.757 M4.473,11.638c0,0.938-0.157,1.502-0.657,1.938
      C2.66,12.388,2.033,10.698,2.033,8.79c0-1.063,0.188-1.875,0.563-2.439c0.626-0.563,1.377-1.095,1.877-1.376v2.409V11.638z
       M8.039,15.576c-1.563-0.187-2.909-0.781-3.91-1.688c1.939-1.406,2.377-2.222,2.377-3.785V3.754l0.062-0.062
      c0.626,0.062,0.971,0.094,1.471,0.125V15.576z M26.805,8.915l-2.533,2.033V6.569l0.094-0.094L26.805,8.915z M28.775,13.952
      l-0.188-0.189c-1.001,1.065-1.438,1.346-2.189,1.346c-0.562,0-1.22-0.342-2.126-1.188v-2.564l4.503-3.439L25.71,4.88
      c-1.345,1.063-1.563,1.251-2.533,2.002c-0.532,0.405-0.845,0.594-1.189,0.75c0.062,0.375,0.125,0.907,0.125,1.282v5.726
      c-0.531,0.498-1.032,0.719-1.407,0.719c-0.501,0-0.876-0.312-0.876-0.844V6.851c-0.312-0.969-0.906-1.595-2.064-2.001l-2.847,2.314
      v-5.38c0-0.781,0.438-1.5,0.844-1.688V0c-1.157,0-1.97,0.752-2.314,1.628l-0.5-1.033l-0.188,0.032V14.39
      c-1.125,0.594-2.345,1.25-3.691,1.25c-0.249,0-0.469,0-0.719-0.029V3.849c0.595,0.062,0.97,0.093,1.314,0.093
      c0.531,0,0.876-0.093,1.126-0.219l1.533-3.128l-0.25-0.062c-0.594,1.188-0.906,1.375-2.189,1.375c-0.594,0-1.908-0.155-3.222-0.312
      C5.411,1.44,4.128,1.284,3.473,1.284c-1.939,0-3.066,1.345-3.066,2.722c0,0.562,0.187,1.126,0.564,1.626l0.217-0.156
      c-0.249-0.313-0.405-0.72-0.405-1.064c0-0.562,0.438-1.062,1.626-1.062c0.47,0,2.127,0.157,3.69,0.28
      C4.316,4.505,2.847,5.443,1.126,6.757C0.375,7.758,0,9.041,0,10.354c0,3.377,2.565,7.035,8.227,7.035
      c1.657-0.937,4.097-2.345,4.097-2.345l2.252,2.033l1.563-1.533l-1.22-1.282V7.727c0.532-0.719,1.126-1.032,1.596-1.032
      c0.531,0,1.031,0.376,1.157,1.064v7.852c0.187,0.656,0.968,1.279,1.751,1.5l2.784-2.096l3.222,2.221L28.775,13.952z" />
    </g>
    <defs>
        <linearGradient id="logoGradient">
            <stop offset="5%"  stop-color="#9a3b3b"/>
            <stop offset="95%" stop-color="#53a5b4"/>
        </linearGradient>
    </defs>
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
