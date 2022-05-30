<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GwLanguageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use function Symfony\Component\String\u;

/**
 * @ApiResource(
 *     shortName="Language",
 *     normalizationContext={"groups"={"lang:read"}},
 *     denormalizationContext={"groups"={"lang:write"}}
 * )
 * @ORM\Entity(repositoryClass=GwLanguageRepository::class)
 */
class GwLanguage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"country:read","lang:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"country:read","lang:read","lang:write"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=GwCountry::class, mappedBy="languages")
     * @Groups({"lang:read"})
     */
    private $countries;

    public function __construct()
    {
        $this->countries = new ArrayCollection();
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

    /**
     * @return Collection<int, GwCountry>
     */
    public function getCountries(): Collection
    {
        return $this->countries;
    }

    public function addCountry(GwCountry $country): self
    {
        if (!$this->countries->contains($country)) {
            $this->countries[] = $country;
            $country->addLanguage($this);
        }

        return $this;
    }

    public function removeCountry(GwCountry $country): self
    {
        if ($this->countries->removeElement($country)) {
            $country->removeLanguage($this);
        }

        return $this;
    }
}
