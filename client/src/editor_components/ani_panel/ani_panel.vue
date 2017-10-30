<template>
	<div>
		<el-row>
			<el-col :span="12" style="text-align:center">
				<el-button type="primary" icon="plus" size="small" @click="addAni" :disabled="isAdded">添加动画</el-button>
			</el-col>
			<el-col :span="12" style="text-align:center">
				<el-button type="primary" icon="caret-right" size="small" @click="playAnimation" :disabled="!!!anis.animationName">播放动画</el-button>
			</el-col>
		</el-row>
		<div class="ani-section" :class="{active: isAdded}">
			<div class="tab-line">
				<div class="tab-line--title">动画</div>
			</div>
			<div class="el-form-item">
				<label>时长(s)</label>
				<div class="el-form-item__content">
					<el-slider v-model="anis.animationDuration" :max="10" :step="step" show-input></el-slider>
				</div>
			</div>
			<div class="el-form-item">
				<label>延迟(s)</label>
				<div class="el-form-item__content">
					<el-slider v-model="anis.animationDelay" :max="10" :step="step" show-input></el-slider>
				</div>
			</div>
			<div class="el-form-item">
				<label class="el-form-item__label" style="width:60px;">是否循环</label>
				<div class="el-form-item__content" stye="margin-left:60px;">
					<el-switch 
						v-model="anis.animationIterationCount" 
						on-value="infinite" 
						off-value="1">
					</el-switch>
				</div>
			</div>
			<div class="el-form-item">
				<label class="el-form-item__label" style="wdith:40px;">方式</label>
				<div class="el-form-item__content" style="margin-left:40px;">
					<el-select v-model="anis.animationName" size="small" filterable>
						<el-option-group
							v-for="group in ops"
							:key="group.label"
							:label="group.label">
							<el-option
								v-for="item in group.options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
						</el-option-group>
					</el-select>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { AniConfig } from './animations'
import { Message } from 'element-ui'
	export default{
		name: 'aniPanel',
		props:{
			value: {
				type: Object,
				default () {
					return {
						animationName: '',
						animationDuration: 1,
						animationDelay: .2,
						animationIterationCount: 1,
						isPlayed: false
					}
				}
			}
		},
		watch:{
			value:{
				immediate: true,
				handler (newVal) {
					this.isAdded = true;
					this.anis = newVal;
				},
				deep: true
			},
			anis:{
				handler (newVal) {
					this.$emit('input', newVal);
				},
				deep: true
			}
		},
		data () {
			return {
				anis:{
					animationName: '',
					animationDuration: 1,
					animationDelay: .2,
					animationIterationCount: 1,
					isPlayed: false
				},
				step: 0.1,
				ops: AniConfig,
				isAdded: false
			}
		},
		methods:{
			addAni (){
				if(this.isAdded){
					Message({
						message: '当前支持添加一种动画效果',
						type: 'warning',
						showClose: true,
						duration: 0
					});
					return false;
				}
				this.isAdded = true;
			},
			playAnimation (){
				this.anis.isPlayed = true;
				let _this = this;
				let time = (this.anis.animationDuration*1 + this.anis.animationDelay*1)*1000;
				setTimeout(function(){
					_this.anis.isPlayed = false;
				}, time);
			}
		}
	}
</script>
<style lang="scss">
	.ani-section{
		display: none;

		&.active{
			display: block;
		}
	}
	.el-input-number--small{
		width: 100px;
	}
	.el-slider__runway.show-input{
		margin-right:110px;
	}

</style>