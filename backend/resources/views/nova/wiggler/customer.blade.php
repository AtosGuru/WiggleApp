<div class="flex items-stretch min-h-40 h-full px-3 py-2">
    <div class="flex-shrink-0 col-span-4">
        <img class="rounded-full wiggle-customer_card_img" src="{{ $customer->profile->photos[0] ?? \App\Models\User::DEFAULT_PHOTO }}" width="50" height="50" alt="Customer {{$customer->id}}">
    </div>
    <div class="flex min-h-full w-full flex-col col-span-8 ml-3 justify-between">
        <div class="flex justify-between font-medium text-lg text-white">
            {{$customer->profile->firstName ?? ''}}&ensp;{{$customer->profile->lastName ?? ' '}}
            <span class="font-light text-xxs text-sky-500">{{$customer->profile->language ?? 'en'}}</span>
        </div>
        <div class="font-normal text-sm">{{ date('d.m.Y', strtotime($customer->profile->birthDate ?? '00.00.0000')) }}</div>
        <div class="text-right">
            <a href="/nova/resources/users/{{ $customer->id }}"
               class="relative inline-flex items-center justify-center h-9 px-3 mr-2 shadow cursor-pointer rounded text-sm font-normal text-gray-500 bg-gray-900 hover:bg-primary-400">
                View profile
            </a>
            <span class="wiggle-customer_card_menu-toggle relative inline-flex items-center justify-center w-9 h-9 shadow cursor-pointer rounded font-normal text-gray-500 bg-gray-900 hover:bg-primary-400">
                &bullet;&bullet;&bullet;
                <div class="absolute h-auto rounded bg-gray-900 px-6 py-4 wiggle-customer_card_menu">
                    <a class="flex justify-between mb-5">Block profile<span>></span></a>
                    <a class="flex justify-between text-red-500">Delete profile<span>></span></a>
                </div>
            </span>
        </div>
    </div>
</div>