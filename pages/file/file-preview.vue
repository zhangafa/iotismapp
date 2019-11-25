<template>
	<view>
		<web-view :src="allUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// viewerUrl: '/hybrid/html/web/viewer.html',
				viewerUrl:  '/pdf/web/viewer.html',
				allUrl: ''
			}
		},
		onLoad(options) {
			let fileUrl = encodeURIComponent( '/api/attachment?name=' + options.name + '&url=' + options.url)
			this.allUrl = this.viewerUrl + '?file=' + fileUrl
		}
	}
</script>
