<template>
  <div id="day-select">
    <ul class="days">
      <li
        :class="{ day: true, active: isActive(day) }"
        v-for="day in days"
        :key="day"
        v-on:click="$emit('day-selected', day)"
      >
        {{ formatDay(day) }}
      </li>
      <li class="day-selector">
        <span class="dec" @click="changeDay(-1)"></span>
        <span class="inc" @click="changeDay(1)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "DaySelect",
  props: {
    day: Object
  },
  data: () => ({
    days: [0, 1, 2, 3, 4, 5, 6].map(num => {
      return dayjs().add(num, "days");
    })
  }),
  methods: {
    formatDay(raw) {
      if (raw.isSame(dayjs(), "day")) {
        return "Today";
      }
      return raw.format("ddd DD/MM");
    },
    isActive(day) {
      return day.isSame(this.day, "day");
    },
    changeDay(change) {
      const newDay = dayjs(this.day).add(change, "days");

      if (this.days.find(day => day.isSame(newDay, "day"))) {
        this.$emit("day-selected", newDay);
      }
    }
  },
  emits: ["day-selected"]
};
</script>
