<template>
  <div class="min-h-screen bg-gray-100 text-on-surface p-8">
    <!-- Our Story Section -->
    <section class="max-w-5xl mx-auto mb-12">
      <h1 class="text-4xl font-bold text-on-surface text-left mb-4">Our Story</h1>
      <p class="text-lg text-on-surface-variant leading-relaxed">
        Founded by <strong>Mr. D</strong>, <strong>No Stray Animals Ever (NSAE)</strong> is a non-profit organization
        dedicated to caring for stray animals. Over the years, our mission has grown from humble beginnings into a
        comprehensive network of volunteers, board members, and professional caregivers, all working together to give
        stray animals a second chance at a safe and fulfilling life.
      </p>
      <p class="text-lg text-on-surface-variant mt-4">
        With over <strong>twenty participants</strong> spanning board members, human resources personnel, caregivers,
        head caregivers, volunteer coordinators, and more, NSAE runs on the passion and generosity of its supporters.
        Our operational costs, including government registration and maintenance, are fully covered through donations
        from board members who believe in our cause.
      </p>
    </section>

    <!-- Our Facilities Section -->
    <section class="max-w-5xl mx-auto mb-12">
      <h2 class="text-3xl font-semibold text-on-surface text-left mb-6">Our Facilities</h2>
      <p class="text-lg text-on-surface-variant leading-relaxed">
        Our headquarters is located at <strong>1 Main Street, Dreamland, DL 00000, ULTRA PLANET</strong>, where each
        participant (except volunteers) is assigned an office. Volunteers primarily operate in Conference Room 101
        and Auditorium 202, ensuring they have a dedicated space to coordinate rescue efforts and plan events.
      </p>
      <p class="text-lg text-on-surface-variant mt-4">
        The crown jewel of NSAE is our <strong>safari park</strong>, situated at
        <strong>2 Park Street, Dreamland, DL 00000, ULTRA PLANET</strong>. This expansive park can accommodate up to
        <strong>3,000 animals</strong>, ranging from dogs and cats to tigers, llamas, ostriches, and even snakes.
        A team of caregivers and veterinary doctors (our head caregivers) maintain the park and ensure that each
        rescued animal is well taken care of, healthy, and thriving in our specialized habitats.
      </p>
    </section>

    <!-- How We Work Section -->
    <section class="max-w-5xl mx-auto mb-12">
      <h2 class="text-3xl font-semibold text-on-surface text-left mb-6">How We Work</h2>
      <p class="text-lg text-on-surface-variant leading-relaxed">
        When volunteers spot a stray animal anywhere on <strong>ULTRA PLANET</strong>, they notify one or more board
        members. The board members then discuss whether NSAE has the capacity to accommodate the stray animal in our
        safari park. If the answer is “yes,” our head caregivers contact the volunteer to arrange for the animal’s
        safe transport. Each caregiver is responsible for a specific group of animals, reporting any important
        updates, medical issues, or progress to the head caregiver, who then relays the information to the board
        members and CEO.
      </p>
      <p class="text-lg text-on-surface-variant mt-4">
        Our <strong>Human Resources (HR)</strong> personnel and CEO oversee administrative tasks such as maintaining
        participant records, tracking funds, and projecting monthly expenditures. HR also compiles monthly reports
        detailing the number of animals collected, meetings held, and the distribution of animals across our
        facilities.
      </p>
      <p class="text-lg text-on-surface-variant mt-4">
        In urgent situations—like sick or dying animals, food shortages, or urgent park maintenance—the CEO and board
        members convene special meetings to address the issues swiftly and effectively. This ensures our animals
        remain safe and our facilities remain top-notch.
      </p>
    </section>

    <!-- Our Leadership -->
    <section class="max-w-5xl mx-auto mb-12">
      <h2 class="text-3xl font-semibold text-on-surface text-left mb-6">Our Leadership</h2>

      <!-- Executive Leadership -->
      <h3 class="text-2xl font-medium text-on-surface-variant mb-4">Executive Leadership</h3>
      <div class="bg-surface p-6 shadow-lg rounded-3xl flex items-center space-x-6 mb-6">
        <!-- 1) We wrap the image in a fixed-size div -->
        <div class="w-24 h-24 rounded-full overflow-hidden shadow-md">
          <img
              src="/src/assets/mrbeast.png"
              alt="Mr. Beast"
              class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 class="text-xl font-semibold">Mr. Beast</h4>
          <p class="text-on-surface-variant">Chairman & Philanthropist</p>
          <p class="text-sm text-on-surface-variant mt-2">
            With a strong background in philanthropy, Mr. Beast has been instrumental in
            funding NSAE's operations, ensuring we can provide continuous care and resources
            to animals in need.
          </p>
        </div>
      </div>

      <!-- Board of Directors -->
      <h3 class="text-2xl font-medium text-on-surface-variant mt-4 mb-4">Board of Directors</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <BoardMember
            name="John Livezey"
            title="CEO & Founder"
            description="As the founder of NSAE, John has dedicated his life to animal rescue and shelter programs."
            image="/src/assets/john.png"
        />
        <BoardMember
            name="Seong Gi-hun"
            title="Financial Director"
            description="Seong oversees NSAE's finances, ensuring sustainable funding and responsible expenditures."
            image="/src/assets/gihun.png"
        />
        <BoardMember
            name="Thien Ong"
            title="Operations Manager"
            description="Thien coordinates the day-to-day operations at our safari park, liaising with caregivers and head caregivers."
            image="/src/assets/Thien.png"
        />
      </div>
    </section>

    <!-- Closing Thoughts -->
    <section class="max-w-5xl mx-auto mb-12">
      <p class="text-lg text-on-surface-variant leading-relaxed">
        From volunteers on the ground to our specialized caregivers, board members, and HR staff, every participant at
        NSAE is driven by a shared commitment to animal welfare. We believe that with the right care, attention, and
        resources, every stray animal can have a brighter future.
      </p>
    </section>

    <!-- Call to Action -->
    <section class="mt-12 max-w-3xl mx-auto text-center p-8 bg-primary-container rounded-3xl shadow-lg">
      <h2 class="text-3xl font-semibold text-on-primary-container">Join Us!</h2>
      <p class="text-lg text-on-primary-container mt-4">
        Become part of the NSAE family! Sign up as a volunteer and help us safeguard and nurture
        stray animals in need—together, we can make a difference.
      </p>
      <router-link to="/signup">
        <button
            class="mt-6 px-8 py-4 text-lg font-semibold rounded-full bg-primary text-on-primary shadow-md hover:shadow-lg transition"
        >
          Become a Volunteer
        </button>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import BoardMember from "@/components/BoardMember.vue";
</script>

<style scoped>
/* General Styles */
:root {
  --primary: #6750A4;
  --on-primary: #FFFFFF;
  --primary-container: #EADDFF;
  --on-primary-container: #21005D;

  --surface: #FFFFFF;
  --on-surface: #1D1B20;
  --on-surface-variant: #49454F;

  --gray-light: #f4f4f9;
  --gray-dark: #333333;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--gray-light);
  color: var(--on-surface);
  margin: 0;
  padding: 0;
}

.min-h-screen {
  min-height: 100vh;
}

h1, h2, h3, h4 {
  color: var(--on-surface);
  font-weight: 600;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h4 {
  font-size: 1.2rem;
  font-weight: 500;
}

/* Text Styling */
.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

.leading-relaxed {
  line-height: 1.75;
}

.text-on-surface-variant {
  color: var(--on-surface-variant);
}

.text-on-primary-container {
  color: var(--on-primary-container);
}

/* Container */
.max-w-5xl {
  max-width: 1200px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mt-12 {
  margin-top: 3rem;
}

.p-8 {
  padding: 2rem;
}

/* Section Styling */
section {
  background-color: var(--surface);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

section h2 {
  color: var(--primary);
}

section .bg-surface {
  background-color: var(--surface);
}

section .bg-primary-container {
  background-color: var(--primary-container);
}

/* Call to Action */
button {
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: var(--primary);
  color: var(--on-primary);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--primary);
}

/* Board Member Card */
.bg-surface {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.bg-surface img {
  border-radius: 50%;
  border: 3px solid var(--primary);
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.sm\:grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.lg\:grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.space-x-6 {
  display: flex;
  gap: 1.5rem;
}

/* Hover Effects */
.bg-surface:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Layout Helpers */
.layout-wrapper {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

/* Navbar Styles */
.navbar {
  background-color: #2e1f4c;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Miscellaneous */
.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.rounded-3xl {
  border-radius: 1.5rem;
}

.shadow-md {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

</style>
