<template>
  <Line :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useWeeklyWeather } from '@/store/weeklyWeather';
import { Line } from 'vue-chartjs';
import i18n from '../utils/vue-i18n';
const { t } = i18n.global;

// Weekly Chart data
const store = useWeeklyWeather();
const { weeklyChartData } = toRefs(store);

const chartData = computed(() => ({
  labels: weeklyChartData.value.date,
  datasets: [
    {
      label: t('dayTemp'),
      data: weeklyChartData.value.tempDay,
      backgroundColor: '#fde68a',
      borderColor: '#fde68a',
      hoverRadius: 6,
    },
    {
      label: t('nightTemp'),
      data: weeklyChartData.value.tempNight,
      backgroundColor: '#a78bfa',
      borderColor: '#a78bfa',
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
