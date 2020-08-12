<template>
    <v-container>
        <v-app id="inspire">
            <div>Bar Chart</div>
            <v-chart :options="brandList"/>
        </v-app>
    </v-container>
</template>
<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/chart/bar'
    
    export default {
        name: "Chart",
        components: {
            'v-chart': ECharts
        },
        data: () => {
            return {
                pageInfo: {
                    page: 0,
                    size: 20,
                    campaignStatus: 'ACTIVE',
                },
                brandList: {
                    title: {
                        text: '极坐标双数值轴'
                    },
                    legend: {
                        data: ['line']
                    },
                    xAxis: { type: 'category' },
                    yAxis: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    dataset:{
                        source: []
                    },
                    series: [{type:'bar'}],
                },   
            }
        },
        mounted() {
            const pageInfo = this.pageInfo;
            this.$store.dispatch('campaignBrand', pageInfo).then(resp =>{
                let list = resp.data.content;
                if (list.length > 0) {
                    list.forEach(item => {
                        this.brandList.dataset.source.push([item.name, item.campaignMembersCount])
                    }); 
                }
            });
        }
    };
</script>