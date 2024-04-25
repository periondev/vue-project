<template>
  <Line :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useWeeklyWeather } from '@/store/weeklyWeather';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart config

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart data
const store = useWeeklyWeather();
const { chartElements } = toRefs(store);

const chartData = computed(() => ({
  labels: chartElements.value.date,
  datasets: [
    {
      label: 'Day Temp',
      backgroundColor: '#fff',
      borderColor: '#fde68a',
      color: '#fff',
      data: chartElements.value.tempDay,
    },
    {
      label: 'Night Temp',
      backgroundColor: '#fff',
      borderColor: '#a78bfa',
      color: '#fff',
      data: chartElements.value.tempNight,
    },
  ],
}));
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
