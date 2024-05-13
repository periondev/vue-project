<template>
  <Line :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useWeeklyWeather } from '@/store/weeklyWeather';
import { Line } from 'vue-chartjs';
import i18n from '../utils/vue-i18n';
const { t, d } = i18n.global;
const weeklyStore = useWeeklyWeather();
const { weeklyChartData } = toRefs(weeklyStore);

// Chart data of weekly weather forecast
const chartData = computed(() => ({
  labels: [
    ...weeklyChartData.value.date.map((el: any, i: number) => [
      el,
      d(weeklyChartData.value.dayOfWeek[i], 'dayOfWeek'),
    ]),
  ],
  datasets: [
    {
      label: t('dayTemp'),
      data: weeklyChartData.value.tempDay,
      backgroundColor: '#fde68a',
      borderColor: '#fde68a',
      hoverRadius: 6,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4,
      datalabels: {
        color: '#fff',
        align: 'end' as const,
        anchor: 'start' as const,
        font: {
          weight: 'bold' as const,
        },
      },
    },
    {
      label: t('nightTemp'),
      data: weeklyChartData.value.tempNight,
      backgroundColor: '#a78bfa',
      borderColor: '#a78bfa',
      hoverRadius: 6,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4,
      datalabels: {
        color: '#fff',
        align: 'end' as const,
        anchor: 'start' as const,
        font: {
          weight: 'bold' as const,
        },
      },
    },
  ],
}));
// Chart options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: 'start' as const,
      labels: {
        boxWidth: 24,
        boxHeight: 10,
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: '#525252',
      },
      ticks: {
        color: '#e5e5e5',
      },
    },
    y: {
      grid: {
        color: '#525252',
      },
      ticks: {
        color: '#e5e5e5',
      },
      suggestedMax: 32,
      suggestedMin: 20,
    },
  },
}));
</script>
