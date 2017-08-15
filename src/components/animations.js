const anis = [{
	  			label: 'None',
	  			icon: 'X',
	  			aniName: '',
	  			selected: true
	  		},{
	  			label: 'Flash',
	  			icon: 'F',
	  			aniName: 'flash',
	  			selected: false
	  		},{
	  			label: 'Bounce',
	  			icon: 'B',
	  			aniName: 'bounce',
	  			selected: false
	  		},{
	  			label: 'Wobble',
	  			icon: 'W',
	  			aniName: 'wobble',
	  			selected: false
	  		},{
	  			label: 'Shake',
	  			icon: 'S',
	  			aniName: 'shake',
	  			selected: false
	  		},{
	  			label: 'Rubberband',
	  			icon: 'RB',
	  			aniName: 'rubberband',
	  			selected: false
	  		},{
	  			label: 'Pulse',
	  			icon: 'P',
	  			aniName: 'pulse',
	  			selected: false
	  		},{
	  			label: 'Swing',
	  			icon: 'S',
	  			aniName: 'swing',
	  			selected: false
	  		},{
	  			label: 'Fade In',
	  			icon: 'FI',
	  			aniName: 'fadeIn',
	  			selected: false
	  		},{
	  			label: 'Fade In ↑',
	  			icon: 'FID',
	  			aniName: 'fadeInDown',
	  			selected: false
	  		},{
	  			label: 'Fade In ↓',
	  			icon: 'FIU',
	  			aniName: 'fadeInUp',
	  			selected: false
	  		},{
	  			label: 'Fade In →',
	  			icon: 'FIL',
	  			aniName: 'fadeInLeft',
	  			selected: false
	  		},{
	  			label: 'Fade In ←',
	  			icon: 'FIR',
	  			aniName: 'fadeInRight',
	  			selected: false
	  		},{
	  			label: 'Bounce In',
	  			icon: 'BI',
	  			aniName: 'bounceIn',
	  			selected: false
	  		},{
	  			label: 'Bounce ↑',
	  			icon: 'BID',
	  			aniName: 'bounceInDown',
	  			selected: false
	  		},{
	  			label: 'Bounce ↓',
	  			icon: 'BIU',
	  			aniName: 'bounceInUp',
	  			selected: false
	  		},{
	  			label: 'Bounce →',
	  			icon: 'BIL',
	  			aniName: 'bounceInLeft',
	  			selected: false
	  		},{
	  			label: 'Bounce ←',
	  			icon: 'BIR',
	  			aniName: 'bounceInRight',
	  			selected: false
	  		},{
	  			label: 'Slide ↑',
	  			icon: 'SID',
	  			aniName: 'slideInDown',
	  			selected: false
	  		},{
	  			label: 'Slide ↓',
	  			icon: 'SIU',
	  			aniName: 'slideInUp',
	  			selected: false
	  		},{
	  			label: 'Slide →',
	  			icon: 'BIS',
	  			aniName: 'slideInLeft',
	  			selected: false
	  		},{
	  			label: 'Slide ←',
	  			icon: 'SIR',
	  			aniName: 'slideInRight',
	  			selected: false
	  		},{
	  			label: 'Slide ↑s',
	  			icon: 'SIDs',
	  			aniName: 'slideInDownSm',
	  			selected: false
	  		},{
	  			label: 'Slide ↓s',
	  			icon: 'SIUs',
	  			aniName: 'slideInUpSm',
	  			selected: false
	  		},{
	  			label: 'Slide →s',
	  			icon: 'BISs',
	  			aniName: 'slideInLeftSm',
	  			selected: false
	  		},{
	  			label: 'Slide ←s',
	  			icon: 'SIRs',
	  			aniName: 'slideInRightSm',
	  			selected: false
	  		},{
	  			label: 'Slide ↗',
	  			icon: 'SID',
	  			aniName: 'slideInDownLeft',
	  			selected: false
	  		},{
	  			label: 'Slide ↖',
	  			icon: 'SIU',
	  			aniName: 'slideInDownRight',
	  			selected: false
	  		},{
	  			label: 'Slide ↙',
	  			icon: 'BIS',
	  			aniName: 'slideInUpRight',
	  			selected: false
	  		},{
	  			label: 'Slide ↘',
	  			icon: 'SIR',
	  			aniName: 'slideInUpLeft',
	  			selected: false
	  		},{
	  			label: 'Roll In',
	  			icon: 'RI',
	  			aniName: 'rollIn',
	  			selected: false
	  		},{
	  			label: 'Rotate In',
	  			icon: 'RI',
	  			aniName: 'rotateIn',
	  			selected: false
	  		},{
	  			label: 'Rotate ↗',
	  			icon: 'RID',
	  			aniName: 'rotateInDownLeft',
	  			selected: false
	  		},{
	  			label: 'Rotate ↘',
	  			icon: 'RIU',
	  			aniName: 'rotateInUpLeft',
	  			selected: false
	  		},{
	  			label: 'Rotate ↖',
	  			icon: 'RIL',
	  			aniName: 'rotateInDownRight',
	  			selected: false
	  		},{
	  			label: 'Rotate ↙',
	  			icon: 'RIR',
	  			aniName: 'rotateInUpRight',
	  			selected: false
	  		},{
	  			label: 'Flip X In',
	  			icon: 'FXI',
	  			aniName: 'flipXIn',
	  			selected: false
	  		},{
	  			label: 'Flip Y In',
	  			icon: 'FYI',
	  			aniName: 'flipYIn',
	  			selected: false
	  		},{
	  			label: 'Flip ↑',
	  			icon: 'FID',
	  			aniName: 'flipInDown',
	  			selected: false
	  		},{
	  			label: 'Flip ↓',
	  			icon: 'FIU',
	  			aniName: 'flipInUp',
	  			selected: false
	  		},{
	  			label: 'Flip →',
	  			icon: 'FIL',
	  			aniName: 'flipInLeft',
	  			selected: false
	  		},{
	  			label: 'Flip ←',
	  			icon: 'FIR',
	  			aniName: 'flipInRight',
	  			selected: false
	  		},{
	  			label: 'Zoom In',
	  			icon: 'ZFI',
	  			aniName: 'zoomIn',
	  			selected: false
	  		},{
	  			label: 'Zoom In ↑',
	  			icon: 'ZI',
	  			aniName: 'zoomInDown',
	  			selected: false
	  		},{
	  			label: 'Zoom In ↓',
	  			icon: 'ZIU',
	  			aniName: 'zoomInUp',
	  			selected: false
	  		},{
	  			label: 'Zoom In →',
	  			icon: 'ZIL',
	  			aniName: 'zoomInLeft',
	  			selected: false
	  		},{
	  			label: 'Zoom In ←',
	  			icon: 'ZIR',
	  			aniName: 'zoomInRight',
	  			selected: false
	  		}];
export const animations = anis;