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
/* Material 3 Colors */
:root {
  --primary: #6750A4;
  --on-primary: #FFFFFF;
  --primary-container: #EADDFF;
  --on-primary-container: #21005D;

  --surface: #FFFFFF;
  --on-surface: #1D1B20;
  --on-surface-variant: #49454F;
}

/* Material 3 Font */
body {
  font-family: "Roboto", sans-serif;
}
</style>
