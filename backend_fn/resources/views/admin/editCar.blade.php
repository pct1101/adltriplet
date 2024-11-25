@extends('admin/layout')
@section('content')
<h1>Edit Car</h1>
<!-- Hiển thị lỗi nếu có -->
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<!-- Form để chỉnh sửa thông tin xe -->
<form action="/updatecaradmin/{{ $car->car_id }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <!-- Car Name -->
    <div class="form-group mt-3">
        <label for="car_name">Car Name:</label>
        <input type="text" name="car_name" id="car_name" class="form-control"
            value="{{ old('car_name', $car->car_name) }}" required>
    </div>

    <!-- Seats -->
    <div class="form-group mt-3">
        <label for="seats">Seats:</label>
        <input type="number" name="seats" id="seats" class="form-control" value="{{ old('seats', $car->seats) }}"
            required>
    </div>

    <!-- Model -->
    <div class="form-group mt-3">
        <label for="model">Model Year:</label>
        <input type="number" name="model" id="model" class="form-control" value="{{ old('model', $car->model) }}"
            required>
    </div>

    <!-- License Plate -->
    <div class="form-group mt-3">
        <label for="license_plate">License Plate:</label>
        <input type="text" name="license_plate" id="license_plate" class="form-control"
            value="{{ old('license_plate', $car->license_plate) }}" required>
    </div>

    <!-- Rental Price -->
    <div class="form-group mt-3">
        <label for="rental_price">Rental Price:</label>
        <input type="number" name="rental_price" id="rental_price" class="form-control" step="0.01"
            value="{{ old('rental_price', $car->rental_price) }}" required>
    </div>

    <!-- Car Status -->
    <div class="form-group mt-3">
        <label for="car_status">Car Status:</label>
        <select name="car_status" id="car_status" class="form-control" required>
            <option value="1" {{ old('car_status', $car->car_status) == 1 ? 'selected' : '' }}>Available</option>
            <option value="0" {{ old('car_status', $car->car_status) == 0 ? 'selected' : '' }}>Unavailable
            </option>
        </select>
    </div>

    <!-- Mileage -->
    <div class="form-group mt-3">
        <label for="mileage">Mileage:</label>
        <input type="number" name="mileage" id="mileage" class="form-control"
            value="{{ old('mileage', $car->mileage) }}" required>
    </div>

    <!-- Description -->
    <div class="form-group mt-3">
        <label for="car_description">Description:</label>
        <textarea name="car_description" id="car_description"
            class="form-control">{{ old('car_description', $car->car_description) }}</textarea>
    </div>

    <!-- Car Brand -->
    <div class="form-group mt-3">
        <label for="brandid">Brand:</label>
        <select name="brandid" id="brandid" class="form-control" required>
            @foreach ($brands as $brand)
                <option value="{{ $brand->brand_id }}" {{ old('brandid', $car->brandid) == $brand->brand_id ? 'selected' : '' }}>
                    {{ $brand->brand_name }}
                </option>
            @endforeach
        </select>
    </div>
    <!-- Car Image -->
    <div class="mb-3">
        <label for="car_image" class="form-label">Car Image:</label>
        <input class="form-control" type="file" name="car_image" id="car_image">
    </div>


    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary mt-3">Update Car</button>
</form>
@endsection