<template>
  <Line :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useCurrentWeather } from '@/store/currentWeather';
import { Line } from 'vue-chartjs';
import i18n from '../utils/vue-i18n';
const { t } = i18n.global;

// Current Chart data
const store = useCurrentWeather();
const { currentChartData } = toRefs(store);

const chartData = computed(() => ({
  labels: currentChartData.value.date,
  datasets: [
    {
      label: t('temp'),
      data: currentChartData.value.temp,
      backgroundColor: '#2dd4bf',
      borderColor: '#2dd4bf',
      hoverRadius: 6,
    },
    {
      label: t('apparentTemp'),
      data: currentChartData.value.at,
      backgroundColor: '#fecdd3',
      borderColor: '#fecdd3',
      hoverRadius: 6,
    },
  ],
}));
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        boxWidth: 24,
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
        color: '#fff',
      },
    },
    y: {
      grid: {
        color: '#525252',
      },
      ticks: {
        color: '#fff',
      },
      suggestedMax: 32,
      suggestedMin: 20,
    },
  },
}));
</script>
