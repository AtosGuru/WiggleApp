<div class="container">
    <div class="row justify-content-center">
        @foreach ($profile->photos ?? [] as $photo)
            <img class="inline-block" style="object-fit: cover;height: 80px" src="{{ $photo }}" alt="Photo" width="80" height="80">
        @endforeach
    </div>
</div>
