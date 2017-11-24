<template>
	<div class="ctrl-scale">
		<transition name="dialog-fade">
			<div class="ctrl-scale__list" v-show="showList">
				<ul>
					<li v-for="(l, index) in scaleList" :class="{active: l.selected}" @click.stop="setScaleVal(l, index)">
						{{ l.label }}
						<span class="s-label">{{ l.sLabel }}</span>
					</li>
				</ul>
				<div class="trangle"></div>
			</div>
		</transition>
	  	<div class="ctrl-scale__minus" :class="{disabled: index < 1}" @click="minusScale">
	    	<div class="minus"></div>
	  	</div>
	  	<div class="ctrl-scale__text" @click="showList = !showList">
	        {{ curData.label }}
	  	</div>
	  	<div class="ctrl-scale__plus" :class="{disabled: index > scaleList.length - 2}" @click="plusScale">
	        <div class="plus-h"></div>
	        <div class="plus-v"></div>
	  	</div>
    </div>
</template>
<script>
import MC from './../../../../sys_components/utils/mobile_util.js'
	export default{
		name: 'scaleCtrl',
		data () {
			return {
				scaleList:[{
					label: '50%',
					value: 0.5,
					selected: false
				},{
					label: '75%',
					value: 0.75,
					selected: false
				},{
					label: '100%',
					sLabel: 'iphone 6',
					value: 1,
					selected: true
				},{
					label: '125%',
					value: 1.25,
					selected: false
				},{
					label: '150%',
					value: 1.5,
					selected: false
				},{
					label: '85.4%',
					sLabel: 'iphone 5',
					value: 0.854,
					selected: false
				}],
				showList: false,
				index: 2
			}
		},
		computed: {
			curData (){
				return this.scaleList[this.index];
			}
		},
		watch:{
			curData:{
				handler (n, o) {
					G.M.clientWidth = 375 * n.value;
					this.$store.dispatch('setClientWidth', G.M.clientWidth);
				},
				deep: true
			}
		},
		methods:{
			setScaleVal (l, index) {
				this.scaleList.forEach((scale, i) => {
					scale.selected = false;
				});
				this.index = index;
				l.selected = true;
				this.showList = false;
			},
			minusScale () {
				if(this.index < 1){
					return;
				}
				this.index = this.index - 1;
				let c = this.scaleList[this.index];
				this.setScaleVal(c, this.index);
			},
			plusScale () {
				if(this.index > this.scaleList.length - 2){
					return;
				}
				this.index = this.index + 1;
				let c = this.scaleList[this.index];
				this.setScaleVal(c, this.index);
			}
		}
	}
</script>
<style lang="scss">
.ctrl-scale{
  position: fixed;
  right: 300px;
  bottom: 50px;
  width: 130px;
  height: 36px;
  word-spacing: -6px;
  z-index: 1000;

  & .ctrl-scale__minus{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 100%;
    width: 40px;
    vertical-align: middle;
    background-color: #30465f;
    border-radius: 18px 0 0 18px;
    word-spacing: 0;

    & .minus{
      width: 10px;
      height: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #fff;

    }
  	&.disabled{
	  	& .minus{
	  		background-color: #808080;
	  	}
  	}

    &:hover{
      background-color: #1f2d3d;
    }
  }
  & .ctrl-scale__plus{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 100%;
    width: 40px;
    vertical-align: middle;
    background-color: #30465f;
    border-radius: 0 18px 18px 0;
    word-spacing: 0;

    & .plus-h{
      width: 10px;
      height: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
    & .plus-v{
      width: 2px;
      height: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
    &.disabled{
	  	& .plus-h, & .plus-v{
	  		background-color: #808080;
	  	}
  	}
    &:hover{
      background-color: #1f2d3d;
    }
  }
  & .ctrl-scale__text{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 100%;
    width: 50px;
    vertical-align: middle;
    background-color: #30465f;
    word-spacing: 0;

    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    }

}
.ctrl-scale__list{
	position: absolute;
	width: 100%;
	bottom: 50px;
	color: #fff;
	background-color: #30465f;

	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		& li{
			padding: 5px 15px;
			cursor: pointer;

			&:hover{
				background-color: lighten(#1f2d3d, 5%);
			}

			&.active{
				background-color: #1f2d3d;
			}
		}
	}

	.trangle{
		position: absolute;
		left: 50%;
		margin-left: -10px;
		border-top: 10px solid #30465f;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
}
.s-label{
	float: right;
	color: #bbb;
}
</style>