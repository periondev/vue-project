<template>
  <Line :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useCurrentWeather } from '@/store/currentWeather';
import { Line } from 'vue-chartjs';
import i18n from '../utils/vue-i18n';
const { t } = i18n.global;
const currentStore = useCurrentWeather();
const { currentChartData } = toRefs(currentStore);

// Chart data of current weather forecast
const chartData = computed(() => ({
  labels: currentChartData.value.date,
  datasets: [
    {
      label: t('temp'),
      data: currentChartData.value.temp,
      backgroundColor: '#2dd4bf',
      borderColor: '#2dd4bf',
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
      label: t('apparentTemp'),
      data: currentChartData.value.at,
      backgroundColor: '#fecdd3',
      borderColor: '#fecdd3',
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
  responsive: false, // set false to enable overflow canvas with scrollbar
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
