<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GwCityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use function Symfony\Component\String\u;

/**
 * @ApiResource(
 *     shortName="City",
 *     attributes={
 *           "paginition_items_per_page"=20
 *     },
 *     normalizationContext={"groups"={"city:read"}},
 *     denormalizationContext={"groups"={"city:write"}}
 * )
 * @ORM\Entity(repositoryClass=GwCityRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"name":"partial"})
 */
class GwCity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"city:read","country:read","city:write","mon:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"city:read","country:read","city:write","mon:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"city:read","city:write"})
     */
    private $latidude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"city:read","city:write"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"city:read","city:write"})
     */
    private $img;

    /**
     * @ORM\ManyToOne(targetEntity=GwCountry::class, inversedBy="cities")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"city:read","city:write"})
     */
    private $country;

    /**
     * @ORM\OneToMany(targetEntity=GwMonument::class, mappedBy="city", orphanRemoval=true)
     * @Groups({"city:read"})
     */
    private $monuments;

    public function __construct()
    {
        $this->monuments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = u($name)->trim()->lower()->title();

        return $this;
    }

    public function getlatidude(): ?string
    {
        return $this->latidude;
    }

    public function setlatidude(?string $latidude): self
    {
        $this->latidude = $latidude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(?string $img): self
    {
        $this->img = $img;

        return $this;
    }

    public function getCountry(): ?GwCountry
    {
        return $this->country;
    }

    public function setCountry(?GwCountry $country): self
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return Collection<int, GwMonument>
     */
    public function getMonuments(): Collection
    {
        return $this->monuments;
    }

    public function addMonument(GwMonument $monument): self
    {
        if (!$this->monuments->contains($monument)) {
            $this->monuments[] = $monument;
            $monument->setCity($this);
        }

        return $this;
    }

    public function removeMonument(GwMonument $monument): self
    {
        if ($this->monuments->removeElement($monument)) {
            // set the owning side to null (unless already changed)
            if ($monument->getCity() === $this) {
                $monument->setCity(null);
            }
        }

        return $this;
    }
}
