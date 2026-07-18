import { jest } from '@jest/globals';
import { addVehicle } from '../../src/services/vehicle.service.js';
import Vehicle from '../../src/models/Vehicle.js';

describe('Vehicle Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addVehicle', () => {
    it('should successfully add a new vehicle', async () => {
      // Arrange
      const mockVehicleData = {
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5
      };

      // Mock the save method directly on the prototype
      Vehicle.prototype.save = jest.fn().mockResolvedValue();

      // Act
      const result = await addVehicle(mockVehicleData);

      // Assert
      expect(result.vehicle.make).toBe(mockVehicleData.make);
      expect(result.vehicle.price).toBe(mockVehicleData.price);
      expect(Vehicle.prototype.save).toHaveBeenCalledTimes(1);
    });
  });
});