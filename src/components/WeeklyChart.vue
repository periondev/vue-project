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
      backgroundColor: '#fef08a',
      borderColor: '#fef08a',
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
      backgroundColor: '#60a5fa',
      borderColor: '#60a5fa',
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
        color: '#3f3f46',
      },
      ticks: {
        color: '#d4d4d4',
      },
    },
    y: {
      grid: {
        color: '#3f3f46',
      },
      ticks: {
        color: '#d4d4d4',
      },
      suggestedMax: 32,
      suggestedMin: 20,
    },
  },
}));
</script>
